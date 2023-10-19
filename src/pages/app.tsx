// import Logo from '@/pages/icons/logo.svg';
import { useState, useEffect, useRef } from 'react';

import cssStyles from './app.module.css';
// import { TabsForSorting } from './tabs-for-sorting';
// import { Tickets } from './tickets';
// import { TransferFilter } from './transfer-filter';

export function App() {
  const [start, setStart] = useState<'on' | 'off'>('off');
  const recognitionRef = useRef<SpeechRecognition | undefined>();

  useEffect(() => {
    const grammar =
      '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;';

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // const SpeechRecognitionEvent =
    //   window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    // const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

    // const speechRecognitionList = new SpeechGrammarList();
    // speechRecognitionList.addFromString(grammar, 1);
    // recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'ru-RU';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.addEventListener('result', (e) => {
      console.log('[33m e.results = ', e.results); //TODO - delete vvtu
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      console.log('[33m transcript = ', transcript); //TODO - delete vvtu
    });

    recognitionRef.current = recognition;
    console.log('[33m recognitionRef.current = ', recognitionRef.current); //TODO - delete vvtu

    //  lang = 'de-DE';
    //  lang = 'en-US';
    //  lang = 'en-US';
    //  lang = 'es-ES';
    //  lang = 'fi-FI';
    //  lang = 'fr-FR';
    //  lang = 'it-IT';
    //  lang = 'pt-PT';
    //  lang = 'ru-RU';
    //  lang = 'zh-CN';
  }, []);

  useEffect(() => {}, [start]);

  return (
    <>
      <div className={cssStyles.appContainer}>
        <div className={cssStyles.height0}>&nbsp;</div>
        <div className={cssStyles.logoContainer}>
          <button
            onClick={() => {
              if (recognitionRef.current) {
                try {
                  recognitionRef.current.start();
                } catch (error) {
                  // doesn't prevent error "Failed to execute 'start' on 'SpeechRecognition': recognition has already started"
                  recognitionRef.current.stop();
                  console.error(error);
                }
              }
            }}
          >
            Старт!
          </button>
          {/* <img src={Logo} alt="Logo icon" width="82" height="89" /> */}
        </div>
        <div className={cssStyles.logoContainer}>
          <div>{start}</div>
        </div>

        {/* <div className={cssStyles['ticketsContainer']}>
          <div className={cssStyles['ticketsSubcontainer']}>
            <TransferFilter />
            <div className={cssStyles['rightContainer']}>
              <TabsForSorting />
              <Tickets />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
