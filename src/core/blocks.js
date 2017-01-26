/**
 * Defines Blockly blocks
 */

const colors = {
  commands: 180,
  inputs: 65,
  // values: 45,
  // operands: 45,
  loops: 120,
  conditionals: 345,
  headers: 45,
};


const blocks = [
  {
    id: 'controls-start',
    message0: 'start',
    args0: [],
    nextStatement: null,
    colour: colors.headers,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'command-fly',
    lastDummyAlign0: 'LEFT',
    message0: 'fly',
    args0: [],
    previousStatement: true,
    nextStatement: true,
    colour: colors.commands,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'controls-if',
    message0: 'if %1 %2 : %3 %4',
    args0: [
      {
        type: 'input_dummy',
      },
      {
        type: 'input_value',
        name: 'condition',
        check: 'Boolean',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'condition_true',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.conditionals,
    tooltip: '',
    helpUrl: '',
  },
];

export default blocks;
