import { useState, useEffect, useRef, useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import {
  ILanguageParam,
  LANGUAGE_PARAM,
  ROBOT_VOICE_PARAM,
  TONGUE_TWISTER_INDEX,
} from '@/app-constants';
import { PlayButton, IPlayButtonState } from '@/components/play-button/play-button';
import panelStyles from '@/pages/panel.module.css';
import { SettingsPanel } from '@/pages/settings-panel/settings-panel';
import { pronunciationWords } from '@/pronunciation-words/pronunciation-words';
import { getVoicesArray } from '@/utils/get-voices-array';
import { handleTextToSpeech } from '@/utils/handle-text-to-speech';

import micIcon from './mic.svg';
import styles from './speech.module.css';

function clearWord(word: string) {
  const word1 = word.replace(/[.|,]/g, ' ');
  const arr = word1.split(' ').filter((w) => w !== '' && w != ' ');

  return arr;
}

export function Speech() {
  const [searchParams /*, setSearchParams */] = useSearchParams();

  const languageParam = (searchParams.get(LANGUAGE_PARAM) ??
    ILanguageParam.russian) as ILanguageParam;

  const tongueTwisterIndex = searchParams.get(TONGUE_TWISTER_INDEX) as string;

  const tongueTwister = tongueTwisterIndex
    ? pronunciationWords[languageParam][parseInt(tongueTwisterIndex, 10)]
    : '';

  const robotVoiceParam000 = parseInt(searchParams.get(ROBOT_VOICE_PARAM) ?? '', 10);
  const robotVoiceParam = isNaN(robotVoiceParam000) ? -1 : robotVoiceParam000;

  const [playOrigin, setPlayOrigin] = useState<IPlayButtonState>('pause');
  const [browserIsSupported, setBrowserIsSupported] = useState<boolean>(true);
  const [microphoneStatus, setMicrophoneStatus] = useState<'on' | 'off'>('off');
  const [spokenWords, setSpokenWords] = useState<SpeechRecognitionAlternative[]>([]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const recognitionRef = useRef<SpeechRecognition | undefined>();

  useEffect(() => {
    if (spokenWords.length > 0) {
      setMicrophoneStatus('off');
    }
  }, [spokenWords.length]);

  useEffect(() => {
    if (
      robotVoiceParam === robotVoiceParam ||
      languageParam === languageParam ||
      tongueTwister === tongueTwister
    ) {
      setMicrophoneStatus('off');
      setSpokenWords([]);
    }
  }, [robotVoiceParam, languageParam, tongueTwister]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition: SpeechRecognition | undefined;

    try {
      recognition = new SpeechRecognition();
    } catch (e) {
      setBrowserIsSupported(false);

      return;
    }

    recognition.continuous = true;
    recognition.lang = languageParam;
    recognition.interimResults = false;
    recognition.maxAlternatives = 2;
    //@ts-ignore
    function addEventListenerHandler(e) {
      e.stopPropagation();
      console.log('[33m e.results = ', e.results); //TODO - delete vvtu
      const spokenWordsArr = Array.from(e.results)
        //@ts-ignore
        .map((result1) => result1[0])
        .map((result) => ({
          transcript: result.transcript.toUpperCase().trim(),
          confidence: result.confidence,
        }));
      console.log('%c Speech Speech spokenWordsArr = = ', 'color: #bada55', spokenWordsArr); //TODO - delete vvtu

      const lastWord = spokenWordsArr[spokenWordsArr.length - 1];
      setSpokenWords((arr) => [...arr, lastWord]);

      if (robotVoiceParam !== -1) {
        recognition?.stop();
        const voice = voices[robotVoiceParam] ?? voices[0];

        voice &&
          handleTextToSpeech(lastWord.transcript, voice).then(() => {
            recognition?.start();
          });
      }
    }
    recognition.addEventListener('result', addEventListenerHandler);
    recognitionRef.current = recognition;

    return () => recognition?.removeEventListener('result', addEventListenerHandler);
  }, [languageParam, robotVoiceParam, voices]);

  useEffect(() => {
    if (microphoneStatus === 'on') {
      try {
        recognitionRef.current?.start();
        // doesn't prevent error "Failed to execute 'microphoneStatus' on 'SpeechRecognition': recognition has already started"
      } catch (error) {
        console.error(error);
      }
    } else {
      recognitionRef.current?.stop();
    }
  }, [microphoneStatus]);

  useEffect(() => {
    getVoicesArray(languageParam).then((vcs) => {
      setVoices(vcs);
      setMicrophoneStatus('off');
    });
  }, [languageParam]);

  if (browserIsSupported === false) {
    return (
      <div className={styles.centerContainer}>
        <div className={styles.layout}>
          <div
            style={{ padding: 40, fontSize: 32 }}
            className={classNames(panelStyles.panelColorAndBorder)}
          >
            Ваш браузер не поддерживается
          </div>
        </div>
      </div>
    );
  }

  const comparisonResult = useMemo(() => {
    if (tongueTwister) {
      const spWords = clearWord(spokenWords[0]?.transcript ?? '');
      if (spWords.length === 0) {
        return [];
      }

      const originWords = clearWord(tongueTwister);

      const result = originWords.map((originWord, index) => {
        const isEqual = originWord.toUpperCase() === (spWords[index] ?? '').toUpperCase();

        return {
          isEqual,
          originWord,
          spokenWord: isEqual ? originWord : (spWords[index] ?? '?').toLowerCase(),
        };
      });

      return result;
    }
  }, [tongueTwister, spokenWords]);

  console.log('%c Speech comparisonResult = ', 'color: #bada55', comparisonResult); //TODO - delete vvtu

  return (
    <>
      <div className={styles.centerContainer}></div>
      <br />
      <div className={styles.layout}>
        <SettingsPanel voices={voices} />
        <div className={classNames(panelStyles.panelColorAndBorder, styles.flexGrow)}>
          {tongueTwister && (
            <>
              <div className={styles.row}>
                <PlayButton
                  buttonState={playOrigin}
                  setButtonState={(w: IPlayButtonState) => {
                    if (w === 'play') {
                      setPlayOrigin('play');
                      const voice = voices[robotVoiceParam] ?? voices[0];
                      voice &&
                        tongueTwister &&
                        handleTextToSpeech(tongueTwister, voice).then(() => {
                          setPlayOrigin('pause');
                        });
                    }
                  }}
                />
                <div className={classNames(styles.wordContainer, styles.blueColor)}>
                  {tongueTwister}
                </div>
              </div>
              <div className={styles.row}>
                <button
                  className={classNames(
                    styles.micButtonContainer,
                    microphoneStatus === 'off'
                      ? styles.micButtonContainerOff
                      : styles.micButtonContainerOn,
                  )}
                  onClick={() => {
                    if (microphoneStatus === 'off') {
                      setMicrophoneStatus('on');
                      setSpokenWords([]);
                    } else {
                      setMicrophoneStatus('off');
                    }
                  }}
                >
                  <div className={styles.micButton}>
                    <img src={micIcon} alt="micIcon" />
                  </div>
                </button>

                <div
                  className={classNames(styles.wordContainer)}
                  style={{ display: 'flex', flexWrap: 'wrap', marginLeft: -8 }}
                >
                  {comparisonResult?.map((item, index) => (
                    <span key={index} className={item.isEqual ? styles.green : styles.red}>
                      {item.spokenWord}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
