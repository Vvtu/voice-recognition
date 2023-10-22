import { useState, useEffect, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { LANGUAGE_PARAM, ILanguageParam, WORDS_LIMIT, PRONUNCIATION_СHECK } from '@/app-constants';
import panelStyles from '@/pages/panel.module.css';
import { SettingsPanel } from '@/pages/settings-panel/settings-panel';
import { pronunciationWords } from '@/pronunciation-words/pronunciation-words';
import { reshuffle } from '@/utils/reshuffle';

import micIcon from './mic.svg';
import styles from './speach.module.css';

export function Speach() {
  const [searchParams /*, setSearchParams */] = useSearchParams();

  const languageParam = (searchParams.get(LANGUAGE_PARAM) ??
    ILanguageParam.russian) as ILanguageParam;
  const pronunciationСheck = searchParams.get(PRONUNCIATION_СHECK) ?? false;

  const [workingStatus, setWorkingStatus] = useState<'on' | 'off'>('off');
  const [spokenWords, setSpokenWords] = useState<SpeechRecognitionAlternative[]>([]);
  const [reshuffledWords, setReshuffledWords] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognition | undefined>();
  const limitExceeded = spokenWords.length >= WORDS_LIMIT;

  console.log('[31m spokenWords = ', spokenWords); //TODO - delete vvtu
  console.log('[33m reshuffledWords = ', reshuffledWords); //TODO - delete vvtu

  useEffect(() => {
    if (!pronunciationСheck) {
      setReshuffledWords([]);
    } else {
      if (reshuffledWords.length === 0 && pronunciationWords[languageParam]) {
        const newReshuffledWords = reshuffle(pronunciationWords[languageParam]).slice(
          0,
          WORDS_LIMIT,
        ) as string[];
        setReshuffledWords(newReshuffledWords as string[]);
      }
    }
  }, [languageParam, pronunciationСheck, reshuffledWords.length]);

  useEffect(() => {
    if (limitExceeded) {
      setWorkingStatus('off');
    }
  }, [limitExceeded, workingStatus]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = languageParam;
    recognition.interimResults = false;
    recognition.maxAlternatives = 2;
    recognition.addEventListener('result', (e) => {
      console.log('[33m e.results = ', e.results); //TODO - delete vvtu
      const spokenWordsArr = Array.from(e.results)
        .map((result1) => result1[0])
        .map((result) => ({
          transcript: result.transcript.toUpperCase().trim(),
          confidence: result.confidence,
        }));
      setSpokenWords(spokenWordsArr);
    });

    recognitionRef.current = recognition;
  }, [languageParam]);

  useEffect(() => {
    if (workingStatus === 'on') {
      try {
        recognitionRef.current?.start();
        // doesn't prevent error "Failed to execute 'workingStatus' on 'SpeechRecognition': recognition has already started"
      } catch (error) {
        console.error(error);
      }
    } else {
      recognitionRef.current?.stop();
    }
  }, [workingStatus]);

  let averageConfidence = 0;
  for (let index = 0; index < spokenWords.length; index++) {
    averageConfidence +=
      spokenWords[index].confidence *
      (pronunciationСheck
        ? reshuffledWords[index] === spokenWords[index]?.transcript
          ? 1
          : 0
        : 1);
  }
  averageConfidence /= spokenWords.length;

  return (
    <>
      <div className={styles.centerContainer}>
        <div
          className={classNames(
            styles.micButtonContaineer,
            workingStatus === 'off' ? styles.micButtonContaineerOff : styles.micButtonContaineerOn,
          )}
          onClick={() => {
            if (workingStatus === 'off') {
              setWorkingStatus('on');
              setSpokenWords([]);
            } else {
              setWorkingStatus('off');
            }
          }}
        >
          <div className={styles.micButton}>
            <img src={micIcon} alt="micIcon" />
            {'Микрофон'}
          </div>
        </div>
      </div>
      <br />
      <div className={styles.layout}>
        <SettingsPanel />
        <div className={classNames(panelStyles.panelColorAndBorder, styles.flexGrow)}>
          {spokenWords.map((word, index) => {
            const match =
              !pronunciationСheck || reshuffledWords[index] === spokenWords[index]?.transcript;

            return (
              <div className={styles.wordContainer} key={`${word}-${index}`}>
                <div className={classNames(styles.index, styles.grey)}>{`${index + 1}.`}</div>
                {!match && <div className={styles.grey}>{`(${reshuffledWords[index]})\u00A0`}</div>}
                <div className={match ? styles.black : styles.red}>{word.transcript}</div>
                <div className={styles.grow} />
                <div className={styles.grey}>{`${(word.confidence * (match ? 100 : 0)).toFixed(
                  2,
                )}%`}</div>
              </div>
            );
          })}
          {workingStatus === 'on' && pronunciationСheck && reshuffledWords[spokenWords.length] && (
            <div className={classNames(styles.wordContainer, styles.micButtonContaineerOn)}>
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
