/**
 * Bidirection parsing/generating of json/text setting
 */

export const fieldBackgrounds = {
  black: 'k',
  blue: 'b',
  yellow: 'y',
};


export const gameObjects = {
  spaceship: 'S',
  asteroid: 'A',
  meteoroid: 'M',
  diamond: 'D',
};


const fieldBackgroundsSet = new Set(Object.values(fieldBackgrounds));
const gameObjectsSet = new Set(Object.values(gameObjects));


export function generateSettingText(setting) {
  const { fields } = setting;
  const settingText = fields.map(row => `|${row.map(fieldToText).join('|')}|`).join('\n');
  return settingText;
}


export function parseTaskSetting(settingText) {
  const lines = settingText.trim().split('\n');
  const fields = lines.map(line => line.trim().split('|').filter(f => f !== '').map(parseField));
  const setting = { fields };
  return setting;
}


function fieldToText(field) {
  const [background, objects] = field;
  const objectsText = (objects.length > 0) ? objects.join('') : ' ';
  const fieldText = background + objectsText;
  return fieldText;
}


function parseField(fieldText) {
  const trimmedFieldText = fieldText.trim();
  if (trimmedFieldText.length === 0) {
    throw new Error(`Invalid field: ${fieldText}`);
  }
  const [background, ...objects] = trimmedFieldText;
  if (!fieldBackgroundsSet.has(background)) {
    throw new Error(`Invalid background: ${background}`);
  }
  objects.forEach(object => {
    if (!gameObjectsSet.has(object)) {
      throw new Error(`Invalid object: ${object}`);
    }
  });
  const field = [background, objects];
  return field;
}
