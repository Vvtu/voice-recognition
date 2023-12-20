import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { ROBOT_VOICE_PARAM, PRONUNCIATION_CHECK, FORBIDDEN_VOICES_SET } from '@/app-constants';
import checkIconChecked from '@/icons/check-icon-checked.svg';
import checkIconEmpty from '@/icons/check-icon-empty.svg';
import radioButtonUnchecked from '@/icons/radio-button-unchecked.svg';
import radioButton from '@/icons/radio-button.svg';
import panelStyles from '@/pages/panel.module.css';
import { getNewSearchParams } from '@/utils/get-new-search-params';

import styles from './settings-panel.module.css';

export function SettingsPanel({ voices }: { voices: SpeechSynthesisVoice[] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const robotVoiceParam000 = parseInt(searchParams.get(ROBOT_VOICE_PARAM) ?? '', 10);
  const robotVoiceParam = isNaN(robotVoiceParam000) ? -1 : robotVoiceParam000;

  const pronunciationCheck = (searchParams.get(PRONUNCIATION_CHECK) ?? 'true') === 'true';

  function handleItemClicked(value: number) {
    const newParams = getNewSearchParams(searchParams);
    if (value === -1) {
      delete newParams[ROBOT_VOICE_PARAM];
    } else {
      newParams[ROBOT_VOICE_PARAM] = value.toFixed(0);
    }

    setSearchParams(newParams);
  }
  function handlePronunciationCheckClicked(value: boolean) {
    const newParams = getNewSearchParams(searchParams);
    if (value) {
      delete newParams[PRONUNCIATION_CHECK];
    } else {
      newParams[PRONUNCIATION_CHECK] = false;
    }

    setSearchParams(newParams);
  }
  const voiceOptions = useMemo(() => {
    const result = voices
      .map((item, index) => ({ name: item.name, index }))
      .filter((item) => !FORBIDDEN_VOICES_SET.has(item.name))
      .slice(0, 5)
      .map((voice) => {
        const arr = voice.name.split(' ');
        const label = arr[0];

        return { value: voice.index, label };
      });

    result.unshift({ value: -1, label: 'Без звука' });

    return result;
  }, [voices]);

  const objVoices = voices.map((item) => item.voiceURI);
  console.log('[33m objVoices = ', objVoices); //TODO - delete vvtu

  return (
    <div className={classNames(styles.layout, panelStyles.panelColorAndBorder)}>
      <div className={styles.header}>Настройки</div>

      {pronunciationCheck ? (
        <div
          className={styles.itemContainer}
          onClick={() => handlePronunciationCheckClicked(false)}
        >
          <div className={styles.itemSubContainer}>
            <img src={checkIconChecked} alt="icon checked" width="40px" height="40px" />
            <div className={styles.itemText}>{'Предлагать слова'}</div>
          </div>
        </div>
      ) : (
        <div className={styles.itemContainer} onClick={() => handlePronunciationCheckClicked(true)}>
          <div className={styles.itemSubContainer}>
            <img src={checkIconEmpty} alt="icon checked" width="40px" height="40px" />
            <div className={styles.itemText}>{'Предлагать слова'}</div>
          </div>
        </div>
      )}

      <div className={styles.divider} />
      {voiceOptions.map(({ value, label }) => (
        <div key={label} className={styles.itemContainer} onClick={() => handleItemClicked(value)}>
          <div className={styles.itemSubContainer}>
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
