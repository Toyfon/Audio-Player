import { FC, memo } from 'react';

import { IoPlayForward } from 'react-icons/io5';

import styles from 'components/PlayerControls/PlayerControls.module.css';

type PlayForwardButtonPropsType = {
  skipSong: (forwards: boolean) => void;
};

export const PlayForwardButton: FC<PlayForwardButtonPropsType> = memo(({ skipSong }) => (
  <button className={styles.skip_btn} type="button" onClick={() => skipSong(true)}>
    <IoPlayForward />
  </button>
));
