import { Speach } from '@/pages/speach/speach';

import styles from './app.module.css';
import { LanguageTabs } from './language-tabs';

export function App() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.height0}>&nbsp;</div>
      <LanguageTabs />
      <Speach />
    </div>
  );
}
