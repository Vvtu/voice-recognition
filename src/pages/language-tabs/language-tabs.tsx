import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { LANGUAGE_PARAM, ILanguageParam, LANGUAGE_ARRAY, LANGUAGE_OBJ } from '@/app-constants';
import { getNewSearcParams } from '@/utils/get-new-searc-params';

import cssStyles from './language-tabs.module.css';

export function LanguageTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const languageParam = searchParams.get(LANGUAGE_PARAM) ?? ILanguageParam.russian;
  function handleTabClick(choice: ILanguageParam) {
    const newParams = getNewSearcParams(searchParams);
    newParams[LANGUAGE_PARAM] = choice;
    if (choice === LANGUAGE_OBJ[ILanguageParam.russian]) {
      delete newParams[LANGUAGE_PARAM];
    } else {
      if (LANGUAGE_OBJ[choice] === undefined) {
        throw new Error(`Не может быть такого выбора choice = "${choice}"`);
      }
    }
    setSearchParams(newParams);
  }

  return (
    <>
      <div className={cssStyles.tabsGroup}>
        {LANGUAGE_ARRAY.map((item, index) => (
          <div
            key={item}
            className={classNames(cssStyles.tab, {
              [cssStyles.middleTab1]: index === 1,
              [cssStyles.middleTab2]: index > 1 && index < LANGUAGE_ARRAY.length - 1,
              [cssStyles.activeFirstTab]: languageParam === item && index === 0,
              [cssStyles.activeMiddleTab]:
                languageParam === item && index > 0 && index < LANGUAGE_ARRAY.length - 1,
              [cssStyles.activeLastTab]:
                languageParam === item && index === LANGUAGE_ARRAY.length - 1,
            })}
            onClick={() => handleTabClick(item)}
          >
            {LANGUAGE_OBJ[item]}
          </div>
        ))}
      </div>
    </>
  );
}
