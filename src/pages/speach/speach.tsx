// import Logo from '@/pages/icons/logo.svg';
import { useState, useEffect, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { LANGUAGE_PARAM, ILanguageParam } from '@/app-constants';

import micIcon from './mic.svg';
import styles from './speach.module.css';
// import { Tickets } from './tickets';
// import { TransferFilter } from './transfer-filter';

export function Speach() {
  const [searchParams /*, setSearchParams */] = useSearchParams();

  const languageParam = searchParams.get(LANGUAGE_PARAM) ?? ILanguageParam.russian;

  const [workingStatus, setWorkingStatus] = useState<'on' | 'off'>('off');
  const [spokenWords, setSpokenWords] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognition | undefined>();

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
        .map((result) => result.transcript);
      console.log('[33m spokenWordsArr = ', spokenWordsArr); //TODO - delete vvtu
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
      <br />
      <br />
      <div className={styles.appContainer}>
        <div className={styles.height0}>&nbsp;</div>
        <div className={styles.logoContainer}>
          {/* <img src={Logo} alt="Logo icon" width="82" height="89" /> */}
        </div>
        <div className={styles.logoContainer}>
          <div>{workingStatus}</div>
        </div>
        {spokenWords.map((word) => (
          <div>{word.toLowerCase()}</div>
        ))}
        {/* <div className={styles['ticketsContainer']}>
          <div className={styles['ticketsSubcontainer']}>
            <TransferFilter />
            <div className={styles['rightContainer']}>
              <LanguageTabs />
              <Tickets />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
