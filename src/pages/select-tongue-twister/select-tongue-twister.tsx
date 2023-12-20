import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { LANGUAGE_PARAM, ILanguageParam } from '@/app-constants';
import arrowLeftIcon from '@/icons/arrow-left-square.svg';
import radioButtonUnchecked from '@/icons/radio-button-unchecked.svg';
import radioButton from '@/icons/radio-button.svg';
import { pronunciationWords } from '@/pronunciation-words/pronunciation-words';

import styles from './select-tongue-twister.module.css';
export function SelectTongueTwister() {
  const [searchParams, setSearchParams] = useSearchParams();

  const languageParam = (searchParams.get(LANGUAGE_PARAM) ??
    ILanguageParam.russian) as ILanguageParam;
  const tongueTwisters = pronunciationWords[languageParam] ?? ([] as string[]);

  console.log('%c Render SelectTongueTwister = ', 'color: orange'); //TODO - delete vvtu
  useEffect(() => {
    console.log('%c Mount SelectTongueTwister = ', 'color: brown'); //TODO - delete vvtu

    return () => {
      console.log('%c Unmount SelectTongueTwister = ', 'color: red'); //TODO - delete vvtu
    };
  }, []);

  return (
    <div>
      <button className={classNames(styles.micButtonContainer)} onClick={() => {}}>
        <div className={styles.micButton}>
          <img src={arrowLeftIcon} alt="иконка 'Назад'" />
          {'Назад'}
        </div>
      </button>
      <div className={classNames(styles.layout, styles.panelColorAndBorder)}>
        <div>
          <div className={styles.header}>Настройки</div>

          {tongueTwisters.map((twister) => (
            <div
              key={twister}
              className={styles.itemContainer}
              onClick={() => {} /* handleItemClicked(value) */}
            >
              <div className={styles.itemSubContainer}>
                {twister === '333' ? (
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
