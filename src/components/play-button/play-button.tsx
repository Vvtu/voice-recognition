import { useEffect } from 'react';

import pauseIcon from './icons/pause-icon.svg';
import playIcon from './icons/play-icon.svg';
import styles from './play-button.module.css';

export type IPlayButtonState = 'pause' | 'play';

export function PlayButton({
  buttonState,
  setButtonState,
}: {
  buttonState: IPlayButtonState;
  setButtonState: (a: IPlayButtonState) => void;
}) {
  console.log('%c Render PlayButton = ', 'color: orange'); //TODO - delete vvtu
  useEffect(() => {
    console.log('%c Mount PlayButton = ', 'color: brown'); //TODO - delete vvtu

    return () => {
      console.log('%c Unmount PlayButton = ', 'color: red'); //TODO - delete vvtu
    };
  }, []);

  return (
    <div
      className={styles.cursorPointer}
      onClick={() => {
        if (buttonState === 'pause') {
          setButtonState('play');
        } else {
          setButtonState('pause');
        }
      }}
    >
      {buttonState === 'play' && <img src={pauseIcon} alt="режим пауза" />}
      {buttonState === 'pause' && <img src={playIcon} alt="режим воспроизведения" />}
    </div>
  );
}
