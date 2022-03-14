import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';

import { FaPlay, FaPause, FaVolumeDown, FaVolumeUp } from 'react-icons/fa';
import { IoPlayForward, IoPlayBack } from 'react-icons/io5';

import styles from 'components/PlayerControls/PlayerControls.module.css';
import { calculateTime } from 'utils/calculateTimeUtil';

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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const progressBarRef = useRef<HTMLInputElement>(null!);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const seconds = Math.floor(audioEl.current.duration);
    setDuration(seconds);
    progressBarRef.current.max = String(seconds);
  }, [audioEl?.current?.onloadedmetadata, audioEl?.current?.readyState]);

  useEffect(() => {
    if (currentTime === duration) {
      skipSong(true);
      setIsPlaying(false);
    }
  }, [currentTime]);

  const changePlayerCurrentTime = (): void => {
    progressBarRef.current.style.setProperty(
      '--seek-before-width',
      // @ts-ignore
      `${(progressBarRef.current.value / duration) * 100}%`,
    );
    setCurrentTime(Number(progressBarRef.current.value));
  };
  const changeRange = (): void => {
    audioEl.current.currentTime = Number(progressBarRef.current.value);
    changePlayerCurrentTime();
  };

  const whilePlaying = (): void => {
    progressBarRef.current.value = String(audioEl.current.currentTime);
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const handlePlayClick = (): void => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioEl.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioEl.current.pause();
      if (typeof animationRef.current === 'number') {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };
  return (
    <div className={styles.player_controls}>
      <input
        type="range"
        defaultValue="0"
        className={styles.progressBar}
        ref={progressBarRef}
        onChange={changeRange}
      />
      <div className={styles.duration_block}>
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
        <div className={styles.duration}>
          {/* {duration && !Number.isNaN(duration) && calculateTime(duration)} */}
          {Number.isNaN(duration) ? (
            '--:--'
          ) : (
            <div className={styles.duration}>{calculateTime(duration)}</div>
          )}
        </div>
      </div>
      <div className={styles.buttons_group}>
        <button className={styles.skip_btn} type="button" onClick={() => skipSong(false)}>
          <IoPlayBack />
        </button>
        <button className={styles.play_btn} type="button" onClick={handlePlayClick}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className={styles.skip_btn} type="button" onClick={() => skipSong(true)}>
          <IoPlayForward />
        </button>
      </div>
      <div className={styles.volumeBlock}>
        <FaVolumeDown />
        <input type="range" defaultValue=".3" className={styles.progressBar} />
        <FaVolumeUp />
      </div>
    </div>
  );
};
