import {
  ChangeEvent,
  FC,
  memo,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { FaPlay, FaPause, FaVolumeDown, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { IoPlayForward, IoPlayBack } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentTime, setDuration } from 'bll/player-slice';
import { selectCurrentTime, selectDuration } from 'bll/selectors/player-selectors';
import styles from 'components/PlayerControls/PlayerControls.module.css';
import { calculateTime } from 'utils/calculateTimeUtil';

type PlayerControlsType = {
  skipSong: (forwards: boolean) => void;
  audioEl: MutableRefObject<HTMLAudioElement>;
};

export const PlayerControls: FC<PlayerControlsType> = memo(({ skipSong, audioEl }) => {
  const currentTime = useSelector(selectCurrentTime);
  const duration = useSelector(selectDuration);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volumeValue, setVolumeValue] = useState<number>(0.5);

  const progressBarRef = useRef<HTMLInputElement>(null!);
  const animationRef = useRef<number | undefined>(undefined);

  const audio = audioEl.current;

  const dispatch = useDispatch();

  useEffect(() => {
    const seconds = Math.floor(audio.duration);
    dispatch(setDuration(seconds));
    progressBarRef.current.max = String(seconds);
  }, [audio?.onloadedmetadata, audio?.readyState]);

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
    dispatch(setCurrentTime(Number(progressBarRef.current.value)));
  };
  const changeRange = (): void => {
    audio.currentTime = Number(progressBarRef.current.value);
    changePlayerCurrentTime();
  };

  const whilePlaying = (): void => {
    progressBarRef.current.value = String(audio.currentTime);
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const handlePlayClick = (): void => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audio.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audio.pause();
      if (typeof animationRef.current === 'number') {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const changeVolume = (e: ChangeEvent<HTMLInputElement>): void => {
    setVolumeValue(+e.currentTarget.value);
    audio.volume = Number(e.currentTarget.value);
    console.log(audio.volume);
  };

  const muteVolume = (): void => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      audio.volume = 0;
    } else {
      audio.volume = 0.5;
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
        <button className={styles.volumeButton} type="button" onClick={muteVolume}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeDown />}
        </button>
        <input
          type="range"
          className={styles.progressBar}
          min="0"
          max="1"
          step="0.001"
          value={volumeValue}
          onChange={changeVolume}
        />
        <FaVolumeUp className={styles.volumeButton} />
      </div>
    </div>
  );
});
