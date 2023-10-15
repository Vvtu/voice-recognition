// import Logo from '@/pages/icons/logo.svg';

import cssStyles from './app.module.css';
// import { TabsForSorting } from './tabs-for-sorting';
// import { Tickets } from './tickets';
// import { TransferFilter } from './transfer-filter';

export function App() {
  return (
    <>
      <div className={cssStyles.appContainer}>
        <div className={cssStyles.height0}>&nbsp;</div>
        <div className={cssStyles.logoContainer}>
          <button>Старт!</button>
          {/* <img src={Logo} alt="Logo icon" width="82" height="89" /> */}
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
