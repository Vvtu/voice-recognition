export const RESPONSE_DELAY = 300;

export const PROBABILITY_OF_ERROR = 0.3;

export const LANGUAGE_PARAM = 'language';
export const ROBOT_VOICE_PARAM = 'robotVoice';

// eslint-disable-next-line no-shadow
export enum ILanguageParam {
  russian = 'ru-RU',
  french = 'fr-FR',
  spanish = 'es-ES',
  english = 'en-US',
}

export const LANGUAGE_ARRAY = Object.values(ILanguageParam);

export const LANGUAGE_OBJ = {
  [ILanguageParam.english]: 'Английский',
  [ILanguageParam.russian]: 'Русский',
  [ILanguageParam.spanish]: 'Испанский',
  [ILanguageParam.french]: 'Французский',
};

//  lang = 'de-DE';
//  lang = 'en-US';
//  lang = 'en-US';
//  lang = 'es-ES';
//  lang = 'fi-FI';
//  lang = 'fr-FR';
//  lang = 'it-IT';
//  lang = 'pt-PT';
//  lang = 'ru-RU';
//  lang = 'zh-CN';

export const PAGE_SIZE = 5;

export const WORDS_LIMIT = 5;
