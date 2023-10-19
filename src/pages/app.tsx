// import Logo from '@/pages/icons/logo.svg';
import { useState, useEffect, useRef } from 'react';

import { Speach } from '@/pages/speach/speach';

import cssStyles from './app.module.css';
import { LanguageTabs } from './language-tabs';
// import { Tickets } from './tickets';
// import { TransferFilter } from './transfer-filter';

export function App() {
  return (
    <>
      <div className={cssStyles.appContainer}>
        <div className={cssStyles.height0}>&nbsp;</div>

        <LanguageTabs />
        <Speach />

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
