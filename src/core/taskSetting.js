/**
 * Bidirection parsing/generating of json/text setting
 */

const validBackgrounds = new Set(['k', 'b', 'y']);
const validObjects = new Set(['S', 'M', 'A', 'D']);


export function generateSettingText(setting) {
  const { fields } = setting;
  const settingText = fields.map(row => `|${row.map(fieldToText).join('|')}|`).join('\n');
  return settingText;
}


export function parseSetting(settingText) {
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
  if (!validBackgrounds.has(background)) {
    throw new Error(`Invalid background: ${background}`);
  }
  objects.forEach(object => {
    if (!validObjects.has(object)) {
      throw new Error(`Invalid object: ${object}`);
    }
  });
  const field = [background, objects];
  return field;
}
