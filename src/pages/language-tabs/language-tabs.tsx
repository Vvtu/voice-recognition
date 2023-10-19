import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { LANGUAGE_PARAM, ILanguageParam } from '@/app-constants';
import { getNewSearcParams } from '@/utils/get-new-searc-params';

import cssStyles from './language-tabs.module.css';

const LANG_ARRAY = Object.values(ILanguageParam);

export function LanguageTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const languageParam = searchParams.get(LANGUAGE_PARAM) ?? ILanguageParam.russian;

  function handleTabClick(choice: ILanguageParam) {
    const newParams = getNewSearcParams(searchParams);
    newParams[LANGUAGE_PARAM] = choice;
    if (choice === ILanguageParam.russian) {
      delete newParams[LANGUAGE_PARAM];
    } else {
      if (!LANG_ARRAY.find(choice)) {
      }
    }
    setSearchParams(newParams);
  }

  return (
    <>
      <div className={cssStyles.tabsGroup}>
        <div
          className={classNames(cssStyles.firstTab, {
            activeFirstTab: languageParam === ILanguageParam.russian,
          })}
          onClick={() => handleTabClick(ILanguageParam.russian)}
        >
          Самый дешевый
        </div>
        <div
          className={classNames(cssStyles.middleTab, {
            activeMiddleTab: languageParam === ILanguageParam.speed,
          })}
          onClick={() => handleTabClick(ILanguageParam.speed)}
        >
          Самый быстрый
        </div>
        <div
          className={classNames(cssStyles.lastTab, {
            [cssStyles.activeLastTab]: languageParam === ILanguageParam.optimal,
          })}
          onClick={() => handleTabClick(ILanguageParam.optimal)}
        >
          Оптимальный
        </div>
        <div
          className={classNames(cssStyles.lastTab, {
            [cssStyles.activeLastTab]: languageParam === ILanguageParam.optimal,
          })}
          onClick={() => handleTabClick(ILanguageParam.optimal)}
        >
          Оптимальный
        </div>
      </div>
    </>
  );
}
