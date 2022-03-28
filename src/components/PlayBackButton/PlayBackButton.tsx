import { FC, memo } from 'react';

import { IoPlayBack } from 'react-icons/io5';

import styles from 'components/PlayerControls/PlayerControls.module.css';

type PlayBackButtonPropsType = {
  skipSong: (forwards: boolean) => void;
};

export const PlayBackButton: FC<PlayBackButtonPropsType> = memo(({ skipSong }) => (
  <button className={styles.skip_btn} type="button" onClick={() => skipSong(false)}>
    <IoPlayBack />
  </button>
));
