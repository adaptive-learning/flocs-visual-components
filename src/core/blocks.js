/**
 * Defines Blockly blocks
 */

const colors = {
  header: 45,
  command: 180,
  test: 65,
  loop: 120,
  conditional: 345,
};


const blocks = [
  {
    id: 'controls-start',
    message0: 'start',
    args0: [],
    nextStatement: null,
    colour: colors.header,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'command-fly',
    message0: 'fly %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          ['ahead', 'ahead'],
          ['left', 'left'],
          ['right', 'right'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.command,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'command-shoot',
    message0: 'shoot',
    args0: [],
    previousStatement: null,
    nextStatement: null,
    colour: colors.command,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'test-color',
    message0: 'color %1 %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'comparator',
        options: [
          ['!=', '!='],
          ['=', '='],
        ],
      },
      {
        type: 'field_dropdown',
        name: 'color',
        options: [
          ['green', 'green'],
          ['blue', 'blue'],
          ['red', 'red'],
          ['yellow', 'yellow'],
          ['magenta', 'magenta'],
        ],
      },
    ],
    output: 'Boolean',
    colour: colors.test,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'test-position',
    message0: 'x %1 %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'comparator',
        options: [
          ['=', '='],
          ['!=', '!='],
          ['>', '>'],
          ['>=', '>='],
          ['<', '<'],
          ['<=', '<='],
        ],
      },
      {
        type: 'field_dropdown',
        name: 'position',
        options: [
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
        ],
      },
    ],
    output: 'Boolean',
    colour: colors.test,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'controls-repeat',
    message0: 'repeat %1 : %2 %3',
    args0: [
      {
        type: 'field_dropdown',
        name: 'position',
        options: [
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
          ['6', '6'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9'],
          ['10', '10'],
        ],
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.loop,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'controls-while',
    message0: 'while %1 : %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'test',
        check: 'Boolean',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.loop,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'controls-if',
    message0: 'if %1 : %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'test',
        check: 'Boolean',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.conditional,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'controls-if-else',
    message0: 'if %1 : %2 %3 else: %4 %5',
    args0: [
      {
        type: 'input_value',
        name: 'test',
        check: 'Boolean',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body-else',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.conditional,
    tooltip: '',
    helpUrl: '',
  },
];

export default blocks;