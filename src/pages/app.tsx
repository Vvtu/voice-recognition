import { Speech } from '@/pages/speech/speech';

import styles from './app.module.css';
import { LanguageTabs } from './language-tabs';

export function App() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.height0}>&nbsp;</div>
      <LanguageTabs />
      <Speech />
    </div>
  );
}
