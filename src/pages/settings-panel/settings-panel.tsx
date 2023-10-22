import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { ROBOT_VOICE_PARAM, PRONUNCIATION_СHECK } from '@/app-constants';
import panelStyles from '@/pages/panel.module.css';
import { getNewSearcParams } from '@/utils/get-new-searc-params';

import checkIconChecked from './check-icon-checked.svg';
import checkIconEmpty from './check-icon-empty.svg';
import radioButtonUnchecked from './radio-button-unchecked.svg';
import radioButton from './radio-button.svg';
import styles from './settings-panel.module.css';

const ITEMS = [
  { value: -1, label: 'Без звука' },
  { value: 0, label: 'Бес пересадок' },
  { value: 1, label: '1 пересадка' },
  { value: 2, label: '2 пересадки' },
  { value: 3, label: '3 пересадки' },
];

export function SettingsPanel() {
  const [searchParams, setSearchParams] = useSearchParams();

  const robotVoiceParam000 = parseInt(searchParams.get(ROBOT_VOICE_PARAM) ?? '', 10);
  const robotVoiceParam = isNaN(robotVoiceParam000) ? -1 : robotVoiceParam000;

  const pronunciationСheck = searchParams.get(PRONUNCIATION_СHECK) ?? false;

  function handleItemClicked(value: number) {
    const newParams = getNewSearcParams(searchParams);
    if (value === -1) {
      delete newParams[ROBOT_VOICE_PARAM];
    } else {
      newParams[ROBOT_VOICE_PARAM] = value.toFixed(0);
    }

    setSearchParams(newParams);
  }
  function handlePronunciationСheckClicked(value: boolean) {
    const newParams = getNewSearcParams(searchParams);
    if (!value) {
      delete newParams[PRONUNCIATION_СHECK];
    } else {
      newParams[PRONUNCIATION_СHECK] = true;
    }

    setSearchParams(newParams);
  }

  return (
    <div className={classNames(styles.layout, panelStyles.panelColorAndBorder)}>
      <div className={styles.header}>Настройки</div>

      {pronunciationСheck ? (
        <div
          className={styles.itemContainer}
          onClick={() => handlePronunciationСheckClicked(false)}
        >
          <div className={styles.itemSubcontainer}>
            <img src={checkIconChecked} alt="icon checked" width="40px" height="40px" />
            <div className={styles.itemText}>{'Проверка произношения'}</div>
          </div>
        </div>
      ) : (
        <div className={styles.itemContainer} onClick={() => handlePronunciationСheckClicked(true)}>
          <div className={styles.itemSubcontainer}>
            <img src={checkIconEmpty} alt="icon checked" width="40px" height="40px" />
            <div className={styles.itemText}>{'Проверка произношения'}</div>
          </div>
        </div>
      )}

      <div className={styles.devider} />
      {ITEMS.map(({ value, label }) => (
        <div key={label} className={styles.itemContainer} onClick={() => handleItemClicked(value)}>
          <div className={styles.itemSubcontainer}>
            {robotVoiceParam === value ? (
              <img src={radioButton} alt="icon checked" width="40px" height="40px" />
            ) : (
              <img src={radioButtonUnchecked} alt="icon checked" width="40px" height="40px" />
            )}
            <div className={styles.itemText}>{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
