// import Logo from '@/pages/icons/logo.svg';
import { useState, useEffect, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';

import { LANGUAGE_PARAM, ILanguageParam } from '@/app-constants';

import cssStyles from './speach.module.css';
// import { Tickets } from './tickets';
// import { TransferFilter } from './transfer-filter';

export function Speach() {
  const [searchParams, setSearchParams] = useSearchParams();

  const languageParam = searchParams.get(LANGUAGE_PARAM) ?? ILanguageParam.russian;

  const [start, setStart] = useState<'on' | 'off'>('off');
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
      // .join('');
      console.log('[33m spokenWordsArr = ', spokenWordsArr); //TODO - delete vvtu
      setSpokenWords(spokenWordsArr);
    });

    recognitionRef.current = recognition;
  }, [languageParam]);

  useEffect(() => {
    if (start === 'on') {
      try {
        recognitionRef.current?.start();
        // doesn't prevent error "Failed to execute 'start' on 'SpeechRecognition': recognition has already started"
      } catch (error) {
        console.error(error);
      }
    } else {
      recognitionRef.current?.stop();
    }
  }, [start]);

  return (
    <>
      <div className={cssStyles.appContainer}>
        <div className={cssStyles.height0}>&nbsp;</div>
        <div className={cssStyles.logoContainer}>
          <button
            onClick={() => {
              if (start === 'off') {
                setStart('on');
              } else {
                setStart('off');
              }
            }}
          >
            {start === 'off' ? 'Старт!' : 'Стоп!'}
          </button>
          {/* <img src={Logo} alt="Logo icon" width="82" height="89" /> */}
        </div>
        <div className={cssStyles.logoContainer}>
          <div>{start}</div>
        </div>
        {spokenWords.map((word) => (
          <div>{word}</div>
        ))}
        {/* <div className={cssStyles['ticketsContainer']}>
          <div className={cssStyles['ticketsSubcontainer']}>
            <TransferFilter />
            <div className={cssStyles['rightContainer']}>
              <LanguageTabs />
              <Tickets />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
