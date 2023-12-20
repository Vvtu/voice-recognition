import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { LANGUAGE_PARAM, ILanguageParam, TONGUE_TWISTER_INDEX } from '@/app-constants';
import arrowLeftIcon from '@/icons/arrow-left-square.svg';
import radioButtonUnchecked from '@/icons/radio-button-unchecked.svg';
import radioButton from '@/icons/radio-button.svg';
import { pronunciationWords } from '@/pronunciation-words/pronunciation-words';
import { getNewSearchParams } from '@/utils/get-new-search-params';

import styles from './select-tongue-twister.module.css';
export function SelectTongueTwister() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const languageParam = (searchParams.get(LANGUAGE_PARAM) ??
    ILanguageParam.russian) as ILanguageParam;

  const tongueTwisterIndex = searchParams.get(TONGUE_TWISTER_INDEX);

  const tongueTwisters = pronunciationWords[languageParam] ?? ([] as string[]);

  function handleItemClicked(index: string) {
    const newParams = getNewSearchParams(searchParams);
    newParams[TONGUE_TWISTER_INDEX] = index;

    navigate({
      pathname: '/',
      search: `?${createSearchParams(newParams)}`,
    });
  }

  return (
    <div>
      <button
        className={classNames(styles.micButtonContainer)}
        onClick={() => {
          navigate(-1);
        }}
      >
        <div className={styles.micButton}>
          <img src={arrowLeftIcon} alt="иконка 'Назад'" />
          {'Назад'}
        </div>
      </button>
      <div className={classNames(styles.layout, styles.panelColorAndBorder)}>
        <div className={styles.list}>
          <div className={styles.header}>Выбор скороговорки</div>

          {tongueTwisters.map((twister, index) => (
            <div
              key={twister}
              className={styles.itemContainer}
              onClick={() => handleItemClicked(index.toString())}
            >
              <div className={styles.itemSubContainer}>
                {index.toString() === tongueTwisterIndex ? (
                  <img src={radioButton} alt="icon checked" width="40px" height="40px" />
                ) : (
                  <img src={radioButtonUnchecked} alt="icon checked" width="40px" height="40px" />
                )}
                <div className={styles.itemText}>{twister}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
