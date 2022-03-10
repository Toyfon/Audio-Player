import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';

import { FaPlay, FaPause } from 'react-icons/fa';
import { IoPlayForward, IoPlayBack } from 'react-icons/io5';

import styles from 'components/PlayerControls/player-controls.module.css';

type PlayerControlsType = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  skipSong: (forwards: boolean) => void;
  audioEl: MutableRefObject<HTMLAudioElement>;
};

export const PlayerControls: FC<PlayerControlsType> = ({
  skipSong,
  isPlaying,
  setIsPlaying,
  audioEl,
}) => {
  const [currentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const progressBarRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    const seconds = Math.floor(audioEl.current.duration);
    setDuration(seconds);
  }, [audioEl?.current?.onloadedmetadata, audioEl.current?.readyState]);

  const calculateTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };
  return (
    <div className={styles.player_controls}>
      <div className={styles.buttons_group}>
        <button className={styles.skip_btn} type="button" onClick={() => skipSong(false)}>
          <IoPlayBack />
        </button>
        <button
          className={styles.play_btn}
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className={styles.skip_btn} type="button" onClick={() => skipSong(true)}>
          <IoPlayForward />
        </button>
      </div>
      <div className={styles.duration_block}>
        {/* current time */}
        <div>{calculateTime(currentTime)}</div>
        <input type="range" defaultValue="0" ref={progressBarRef} />
        {/*  duration */}
        <div>{duration && !Number.isNaN(duration) && calculateTime(duration)}</div>
      </div>
    </div>
  );
};
