import { useState, useEffect, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import {
  ILanguageParam,
  LANGUAGE_PARAM,
  WORDS_LIMIT,
  PRONUNCIATION_CHECK,
  ROBOT_VOICE_PARAM,
} from '@/app-constants';
import panelStyles from '@/pages/panel.module.css';
import { SettingsPanel } from '@/pages/settings-panel/settings-panel';
import { pronunciationWords } from '@/pronunciation-words/pronunciation-words';
import { getVoicesArray } from '@/utils/get-voices-array';
import { handleTextToSpeech } from '@/utils/handle-text-to-speech';
import { reshuffle } from '@/utils/reshuffle';

import micIcon from './mic.svg';
import styles from './speech.module.css';

export function Speech() {
  const [searchParams /*, setSearchParams */] = useSearchParams();

  const languageParam = (searchParams.get(LANGUAGE_PARAM) ??
    ILanguageParam.russian) as ILanguageParam;
  const pronunciationCheck = (searchParams.get(PRONUNCIATION_CHECK) ?? 'true') === 'true';

  const robotVoiceParam000 = parseInt(searchParams.get(ROBOT_VOICE_PARAM) ?? '', 10);
  const robotVoiceParam = isNaN(robotVoiceParam000) ? -1 : robotVoiceParam000;

  const [browserIsSupported, setBrowserIsSupported] = useState<boolean>(true);
  const [microphoneStatus, setMicrophoneStatus] = useState<'on' | 'off'>('off');
  const [spokenWords, setSpokenWords] = useState<SpeechRecognitionAlternative[]>([]);
  const [reshuffledWords, setReshuffledWords] = useState<string[]>([]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const recognitionRef = useRef<SpeechRecognition | undefined>();
  const limitExceeded = spokenWords.length >= WORDS_LIMIT;

  console.log('[33m microphoneStatus = ', microphoneStatus); //TODO - delete vvtu
  console.log('[31m spokenWords = ', spokenWords); //TODO - delete vvtu
  console.log('[33m reshuffledWords = ', reshuffledWords); //TODO - delete vvtu

  useEffect(() => {
    if (
      robotVoiceParam === robotVoiceParam ||
      languageParam === languageParam ||
      pronunciationCheck === pronunciationCheck
    ) {
      setMicrophoneStatus('off');
      setSpokenWords([]);
    }
  }, [robotVoiceParam, languageParam, pronunciationCheck]);

  useEffect(() => {
    if (limitExceeded) {
      setMicrophoneStatus('off');
    }
  }, [limitExceeded]);

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
      const lastWord = spokenWordsArr[spokenWordsArr.length - 1];
      setSpokenWords((arr) => [...arr, lastWord]);

      if (robotVoiceParam !== -1) {
        recognition?.stop();
        const voice = voices[robotVoiceParam] ?? voices[0];

        voice &&
          handleTextToSpeech(lastWord.transcript, voice).then(() => {
            if (!limitExceeded) {
              recognition?.start();
            }
          });
      }
    }
    recognition.addEventListener('result', addEventListenerHandler);
    recognitionRef.current = recognition;

    return () => recognition?.removeEventListener('result', addEventListenerHandler);
  }, [languageParam, limitExceeded, robotVoiceParam, voices]);

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
    });
  }, [languageParam]);

  let averageConfidence = 0;
  for (let index = 0; index < spokenWords.length; index++) {
    averageConfidence +=
      spokenWords[index].confidence *
      (pronunciationCheck
        ? reshuffledWords[index] === spokenWords[index]?.transcript
          ? 1
          : 0
        : 1);
  }
  averageConfidence /= spokenWords.length;

  console.log('[33m browserIsSupported = ', browserIsSupported); //TODO - delete vvtu

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

  console.log('[33m spokenWords = ', spokenWords); //TODO - delete vvtu

  return (
    <>
      <div className={styles.centerContainer}>
        <button
          className={classNames(
            styles.micButtonContainer,
            microphoneStatus === 'off' ? styles.micButtonContainerOff : styles.micButtonContainerOn,
          )}
          onClick={() => {
            if (microphoneStatus === 'off') {
              setMicrophoneStatus('on');
              setSpokenWords([]);
              setReshuffledWords(
                pronunciationCheck
                  ? (reshuffle(pronunciationWords[languageParam] ?? []).slice(
                      0,
                      WORDS_LIMIT,
                    ) as string[])
                  : [],
              );
            } else {
              setMicrophoneStatus('off');
            }
          }}
        >
          <div className={styles.micButton}>
            <img src={micIcon} alt="micIcon" />
            {'Микрофон'}
          </div>
        </button>
      </div>
      <br />
      <div className={styles.layout}>
        <SettingsPanel voices={voices} />
        <div className={classNames(panelStyles.panelColorAndBorder, styles.flexGrow)}>
          {spokenWords.map((word, index) => {
            const match =
              !pronunciationCheck || reshuffledWords[index] === spokenWords[index]?.transcript;

            return (
              <div className={styles.wordContainer} key={`${word}_${index}`}>
                <div className={classNames(styles.index, styles.grey)}>{`${index + 1}.`}</div>
                {!match && reshuffledWords[index] && (
                  <div className={styles.grey}>{`(${reshuffledWords[index]})\u00A0`}</div>
                )}
                <div className={match ? styles.black : styles.red}>{word.transcript}</div>
                <div className={styles.grow} />
                <div className={styles.grey}>{`${(word.confidence * (match ? 100 : 0)).toFixed(
                  2,
                )}%`}</div>
              </div>
            );
          })}
          {microphoneStatus === 'on' &&
            pronunciationCheck &&
            reshuffledWords[spokenWords.length] && (
              <div
                key={reshuffledWords[spokenWords.length]}
                className={classNames(styles.wordContainer, styles.micButtonContainerOn)}
              >
                <div className={classNames(styles.index, styles.grey)}>{`${
                  spokenWords.length + 1
                }.`}</div>
                <div className={styles.grey}>{reshuffledWords[spokenWords.length]}</div>
              </div>
            )}
          {spokenWords.length > 0 && (
            <div className={classNames(styles.wordContainer)}>
              <div className={styles.grow} />
              <div
                className={classNames(limitExceeded ? styles.black : styles.grey, styles.totalLine)}
              >{`${(averageConfidence * 100).toFixed(2)}%`}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
