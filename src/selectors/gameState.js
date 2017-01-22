import { getTaskEnvironment, getInitialFieldsFromTaskEnvironment } from './taskEnvironment';

export function getColor(state, taskEnvironmentId) {
  const gameState = getGameState(state, taskEnvironmentId);
  const { fields } = gameState;
  const [y, x] = findSpaceshipPosition(fields);
  const field = fields[y][x];
  const color = field[0];  // TODO: more explicit way to get background
  return color;
}


export function getPosition(state, taskEnvironmentId) {
  const gameState = getGameState(state, taskEnvironmentId);
  const { fields } = gameState;
  const [_y, x] = findSpaceshipPosition(fields);
  const position = x + 1;
  return position;
}


export function isSolved(state, taskEnvironmentId) {
  return getGameStage(state, taskEnvironmentId) === 'solved';
}


export function isDead(state, taskEnvironmentId) {
  return getGameStage(state, taskEnvironmentId) === 'dead';
}


export function getGameStage(state, taskEnvironmentId) {
  const gameState = getGameState(state, taskEnvironmentId);
  return gameState.stage;
}


export function getGameState(state, taskEnvironmentId) {
  const taskEnvironment = getTaskEnvironment(state, taskEnvironmentId);
  const gameState = computeGameStateOfTaskEnvironment(taskEnvironment);
  return gameState;
}


// --------------------------------------------------------------------------
// TODO: move the code below to the core (?)

function computeGameStateOfTaskEnvironment(taskEnvironment) {
  const fields = computeCurrentFields(taskEnvironment);
  const diamondsTotal = countDiamonds(getInitialFieldsFromTaskEnvironment(taskEnvironment));
  const diamonds = {
    taken: diamondsTotal - countDiamonds(fields),
    total: diamondsTotal,
  };
  const spaceship = findSpaceshipPosition(fields);
  let stage = 'preparing';
  if (spaceship !== null) {
    if (isSpaceshipDead(fields, spaceship)) {
      stage = 'dead';
    } else if (gameSolved(fields, spaceship)) {
      stage = 'solved';
    } else if (taskEnvironment.interpreting) {
      stage = 'running';
    } else if (taskEnvironment.pastActions.length > 0) {
      stage = 'stopped';
    } else {
      stage = 'initial';
    }
  }
  return { fields, stage, diamonds };
}


function computeCurrentFields(taskEnvironment) {
  const { pastActions, currentAction } = taskEnvironment;
  const initialFields = getInitialFieldsFromTaskEnvironment(taskEnvironment);
  let nextFields = doActionMoves(initialFields, pastActions);
  if (currentAction !== null) {
    nextFields = doAction(nextFields, currentAction);
  }
  return nextFields;
}


function doActionMoves(fields, actionMoves) {
  return actionMoves.reduce(doActionMove, fields);
}


function doActionMove(fields, action) {
  const preNextFields = performObjectEvolution(doAction(fields, action));
  if (isSpaceshipDead(preNextFields, findSpaceshipPosition(preNextFields))) {
    return preNextFields;
  }
  let direction = null;
  switch (action) {
    case 'left': {
      direction = 'left';
      break;
    }
    case 'right': {
      direction = 'right';
      break;
    }
    default: {
      direction = 'ahead';
      break;
    }
  }
  const nextFields = performObjectEvolution(performMove(preNextFields, direction));
  return nextFields;
}


function doAction(fields, action) {
  const spaceship = findSpaceshipPosition(fields);
    // NOTE: sure, given the limited size of the grid, finding position is O(1)
    // operation, but if there is a performance problem, I would recommend to
    // look at this and use a better data structure
  if (isSpaceshipDead(fields, spaceship)) {
    return fields;
  }
  let nextFields = fields;
  switch (action) {
    case 'fly':
    case 'left':
    case 'right': {
      break;
    }
    case 'shoot': {
      nextFields = performShot(fields);
      break;
    }
    default: {
      throw new Error(`Undefined action ${action}`);
    }
  }
  return nextFields;
}


function performObjectEvolution(fields) {
  // TODO: factor out 2D map / (world bg+objects map?) into a separate utility function
  const newFields = fields.map((row) => row.map((field) => {
    const [background, objects] = field;
    const explosion = (objects.indexOf('explosion') > -1);
    const removeAllIfExplosion = oldObjects => ((explosion) ? [] : oldObjects);
    const effects = new Set(['laser', 'laser-start', 'laser-end']);
    const removeEffects = oldObjects => oldObjects.filter(obj => !effects.has(obj));
    const evolvedObjects = removeAllIfExplosion(removeEffects(objects));
    const remainingObjects = takeObjectsBySpaceship(evolvedObjects);
    return [background, remainingObjects];
  }));
  return newFields;
}


function takeObjectsBySpaceship(objects) {
  const spaceshipHere = (objects.indexOf('S') > -1);
  if (!spaceshipHere) {
    return objects;
  }
  const remainingObjects = objects.filter(obj => obj !== 'D');
  return remainingObjects;
}


/**
 * Return new 2D fields after move of the spaceship represented as object 'S'.
 * Dicection is one of 'left', 'ahead', 'right'.
 */
function performMove(fields, direction) {
  const oldSpaceshipPosition = findSpaceshipPosition(fields);
  const dx = { left: -1, ahead: 0, right: 1 }[direction];
  const newSpaceshipPosition = [oldSpaceshipPosition[0] - 1, oldSpaceshipPosition[1] + dx];
  const newFields = fields.map((row, i) => row.map((field, j) => {
    const [background, oldObjects] = field;
    let newObjects = oldObjects;
    if (i === oldSpaceshipPosition[0] && j === oldSpaceshipPosition[1]) {
      if (outsideWorld(fields, newSpaceshipPosition)) {
        const border = (j === 0) ? 'left' : 'right';
        newObjects = [`spaceship-out-${border}`];
      } else {
        newObjects = [];
      }
    }
    if (i === newSpaceshipPosition[0] && j === newSpaceshipPosition[1]) {
      if (onRock(fields, newSpaceshipPosition)) {
        newObjects = [...newObjects, 'spaceship-broken'];
      } else {
        newObjects = [...newObjects, 'S'];
      }
    }
    return [background, newObjects];
  }));
  return newFields;
}


function performShot(fields) {
  const [yStart, x] = findSpaceshipPosition(fields);
  const noObjectAt = y => fields[y][x][1].length === 0;
  let yEnd = yStart - 1;
  while (yEnd > 0 && noObjectAt(yEnd)) {
    yEnd--;
  }
  const newFields = fields.map((row, i) => row.map((field, j) => {
    const [background, oldObjects] = field;
    let newObjects = oldObjects;
    if (j === x) {
      if (i === yStart) {
        newObjects = ['laser-start', ...oldObjects];
      } else if (yStart > i && i > yEnd) {
        newObjects = ['laser', ...oldObjects];
      } else if (i === yEnd) {
        newObjects = ['laser-end', ...oldObjects.map(shootObject)];
      }
    }
    return [background, newObjects];
  }));
  return newFields;
}


function shootObject(obj) {
  // TODO: improve readability and maintainability
  const shootableObjects = new Set(['M']);
  const shotObject = (shootableObjects.has(obj)) ? 'explosion' : obj;
  return shotObject;
}


function findSpaceshipPosition(fields) {
  for (let i = 0; i < fields.length; i++) {
    for (let j = 0; j < fields[i].length; j++) {
      const objects = fields[i][j][1];
      if (objects.some(obj => obj === 'S' || obj.startsWith('spaceship'))) {
        return [i, j];
      }
    }
  }
  return null;
}


function gameSolved(fields, spaceship) {
  if (isSpaceshipDead(fields, spaceship)) {
    return false;
  }
  const solved = countDiamonds(fields) === 0 && lastRowReached(spaceship);
  return solved;
}


function lastRowReached(spaceship) {
  return spaceship[0] === 0;
}


function isSpaceshipDead(fields, spaceship) {
  return outsideWorld(fields, spaceship) || onRock(fields, spaceship);
}


function outsideWorld(fields, position) {
  const [y, x] = position;
  const [minX, maxX] = [0, fields[0].length - 1];
  const [minY, maxY] = [0, fields.length - 1];
  return (x < minX || x > maxX || y < minY || y > maxY);
}


function onRock(fields, position) {
  const rockObjects = new Set(['M', 'A']);  // TODO: factor out to common world description?)
  const [y, x] = position;
  const objects = fields[y][x][1];
  return objects.some(object => rockObjects.has(object));
}


function countDiamonds(fields) {
  let count = 0;
  fields.forEach(row => row.forEach(field => field[1].forEach(object => {
    count += (object === 'D') ? 1 : 0;
  })));
  return count;
}
