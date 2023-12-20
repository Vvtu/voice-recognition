import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import {
  LANGUAGE_PARAM,
  ILanguageParam,
  LANGUAGE_ARRAY,
  LANGUAGE_OBJ,
  SELECT_TONGUE_TWISTER,
  TONGUE_TWISTER_INDEX,
} from '@/app-constants';
import listIcon from '@/icons/list-icon.svg';
import { getNewSearchParams } from '@/utils/get-new-search-params';

import styles from './language-tabs.module.css';

export function LanguageTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const languageParam = searchParams.get(LANGUAGE_PARAM) ?? ILanguageParam.russian;
  function handleTabClick(choice: ILanguageParam) {
    const newParams = getNewSearchParams(searchParams);
    newParams[LANGUAGE_PARAM] = choice;
    delete newParams[TONGUE_TWISTER_INDEX];
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
    <div className={styles.layout}>
      <div className={styles.tabsGroup}>
        {LANGUAGE_ARRAY.map((item, index) => (
          <div
            key={item}
            className={classNames(styles.tab, {
              [styles.middleTab1]: index === 1,
              [styles.middleTab2]: index > 1 && index < LANGUAGE_ARRAY.length - 1,
              [styles.activeFirstTab]: languageParam === item && index === 0,
              [styles.activeMiddleTab]:
                languageParam === item && index > 0 && index < LANGUAGE_ARRAY.length - 1,
              [styles.activeLastTab]: languageParam === item && index === LANGUAGE_ARRAY.length - 1,
            })}
            onClick={() => handleTabClick(item)}
          >
            {LANGUAGE_OBJ[item]}
          </div>
        ))}
      </div>

      <button
        className={classNames(styles.micButtonContainer)}
        onClick={() => {
          const params = getNewSearchParams(searchParams);
          navigate({
            pathname: `/${SELECT_TONGUE_TWISTER}`,
            search: `?${createSearchParams(params)}`,
          });
        }}
      >
        <div className={styles.micButton}>
          <img src={listIcon} alt="иконка 'Назад'" />
          {'Выбор скороговорки'}
        </div>
      </button>
    </div>
  );
}
