import { FC, useState, useRef, useEffect } from 'react';

import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { FaPlay, FaPause } from 'react-icons/fa';

import styles from 'components/AudioPlayer.module.css';

export const AudioPlayer: FC = () => {
  // state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // references
  const audioPlayerRef = useRef<HTMLAudioElement>(null!); // reference our audio components
  const progressBarRef = useRef<HTMLInputElement>(null!); // reference our progress bar
  const animationRef = useRef<number | undefined>(undefined); // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayerRef.current.duration);
    setDuration(seconds);
    progressBarRef.current.max = String(seconds);
  }, [audioPlayerRef?.current?.onloadedmetadata, audioPlayerRef?.current?.readyState]);

  const calculateTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const changePlayerCurrentTime = (): void => {
    progressBarRef.current.style.setProperty(
      '--seek-before-width',
      // @ts-ignore
      `${(progressBarRef.current.value / duration) * 100}%`,
    );
    setCurrentTime(Number(progressBarRef.current.value));
  };

  const changeRange = (): void => {
    // @ts-ignore
    audioPlayerRef.current.currentTime = Number(progressBarRef.current.value);
    changePlayerCurrentTime();
  };
  const whilePlaying = (): void => {
    progressBarRef.current.value = String(audioPlayerRef.current.currentTime);
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const handlePlayClick = (): void => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayerRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayerRef.current.pause();
      if (typeof animationRef.current === 'number') {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const backThirty = (): void => {
    // @ts-ignore
    progressBarRef.current.value = Number(progressBarRef.current.value - 30);
    changeRange();
  };
  const forwardThirty = (): void => {
    // @ts-ignore
    progressBarRef.current.value = Number(progressBarRef.current.value + 30);
    changeRange();
  };

  return (
    <div className={styles.audioPlayer}>
      <audio
        ref={audioPlayerRef}
        src="https://dl2.mp3party.net/online/4700893.mp3"
        preload="metadata"
      >
        <track kind="captions" />
      </audio>
      <button type="button" className={styles.forwardBackWard} onClick={backThirty}>
        <BsArrowLeftShort /> 30
      </button>
      <button type="button" onClick={handlePlayClick} className={styles.playPause}>
        {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
      </button>
      <button type="button" className={styles.forwardBackWard} onClick={forwardThirty}>
        30
        <BsArrowRightShort />
      </button>

      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div className={styles.progressBarWrapper}>
        <input
          type="range"
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBarRef}
          onChange={changeRange}
        />
      </div>

      {/* duration */}
      <div className={styles.duration}>
        {duration && !Number.isNaN(duration) && calculateTime(duration)}
      </div>
    </div>
  );
};
