import csLocaleData from 'react-intl/locale-data/cs.js';
import { addLocaleData, IntlProvider } from 'react-intl';
import messagesCs from './messages-cs';
import messagesEn from './messages-en';

addLocaleData(csLocaleData);

const messages = {
  cs: messagesCs,
  en: messagesEn,
};

export function getLocalizationSetting(locale) {
  return {
    locale,
    messages: messages[locale],
  };
}

// temporary hack to allow easily localizing non-component messages in 3rd
// party librarires (Blockly), TODO: unhack
const { intl } = new IntlProvider(getLocalizationSetting('cs'), {}).getChildContext();
export function translate(id, values = {}) {
  return intl.formatMessage({ id, values });
}
