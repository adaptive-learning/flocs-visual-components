import csLocaleData from 'react-intl/locale-data/cs.js';
import { addLocaleData } from 'react-intl';
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
