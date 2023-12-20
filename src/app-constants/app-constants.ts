export const RESPONSE_DELAY = 300;

export const PROBABILITY_OF_ERROR = 0.3;

export const LANGUAGE_PARAM = 'language';
export const ROBOT_VOICE_PARAM = 'robotVoice';
export const PRONUNCIATION_CHECK = 'pronunciationCheck';

// eslint-disable-next-line no-shadow
export enum ILanguageParam {
  russian = 'ru-RU',
  english = 'en-US',
}

export const LANGUAGE_ARRAY = Object.values(ILanguageParam);

export const LANGUAGE_OBJ = {
  [ILanguageParam.english]: 'Английский',
  [ILanguageParam.russian]: 'Русский',
};

//  lang = 'de-DE'; Немецкий
//  lang = 'en-US';
//  lang = 'en-US';
//  lang = 'es-ES';
//  lang = 'fi-FI'; Финский
//  lang = 'fr-FR';
//  lang = 'it-IT'; Итальянский
//  lang = 'pt-PT'; Португальский
//  lang = 'ru-RU';
//  lang = 'zh-CN'; Чешский

export const PAGE_SIZE = 5;

export const WORDS_LIMIT = 5;

// eslint-disable-next-line no-shadow
export enum IFigureShape {
  circle = 1,
  square,
  triangle,
}
export const FIGURE_MAP = new Map([
  ['КРУГ', IFigureShape.circle],
  ['КРУЖОК', IFigureShape.circle],
  ['CIRCLE', IFigureShape.circle],

  //
  ['КВАДРАТ', IFigureShape.square],
  ['SQUARE', IFigureShape.square],

  //
  ['ТРЕУГОЛЬНИК', IFigureShape.triangle],
  ['TRIANGLE', IFigureShape.triangle],
]);
export const FIGURE_COLOR_MAP = new Map([
  ['КРАСНЫЙ', 'red'],
  ['ОРАНЖЕВЫЙ', 'orange'],
  ['ЖЁЛТЫЙ', 'yellow'],
  ['ЗЕЛЁНЫЙ', 'green'],
  ['СИНИЙ', 'blue'],
  ['ФИОЛЕТОВЫЙ', 'violet'],
  ['ЧЁРНЫЙ', 'black'],
  ['БЕЛЫЙ', 'white'],
  //
  ['RED', 'red'],
  ['ORANGE', 'orange'],
  ['YELLOW', 'yellow'],
  ['GREEN', 'green'],
  ['BLUE', 'blue'],
  ['VIOLET', 'violet'],
  ['BLACK', 'black'],
  ['WHITE', 'white'],
]);

export const FORBIDDEN_VOICES_SET = new Set([
  'Google US English',
  'Zarvox',
  'Wobble',
  // 'Trinoids',
  'Superstar',
  'Shelley (English (United States))',
  // 'Sandy (English (United States))',
  'Rocko (English (United States))',
  'Ralph',
  'Organ',
  'Nicky',
  'Kathy',
  'Junior',
  'Jester',
  'Grandpa (English (United States))',
  'Grandma (English (United States))',
  'Good News',
  //'Fred',
  // 'Flo (English (United States))',
  //'Eddy (English (United States))',
  'Cellos',
  'Bubbles',
  'Boing',
  'Bells',
  'Bahh',
  'Bad News',
  // 'Albert',
  'Aaron',
]);
