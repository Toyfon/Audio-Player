import { FC, memo, MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { FaPause, FaPlay, FaRandom } from 'react-icons/fa';
import { IoPlayBack, IoPlayForward } from 'react-icons/io5';
import { MdRepeat, MdRepeatOne } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentTime, setDuration } from 'bll/player-slice';
import {
  selectCurrentTime,
  selectDuration,
  selectIsRepeat,
} from 'bll/selectors/player-selectors';
import styles from 'components/PlayerControls/PlayerControls.module.css';
import { VolumeSettings } from 'components/PlayerControls/VolumeBlock/VolumeSettings';
import { calculateTime } from 'utils/calculateTimeUtil';

type PlayerControlsType = {
  skipSong: (forwards: boolean) => void;
  audioEl: MutableRefObject<HTMLAudioElement>;
  currentSongIndex: number;
  handleChangeRepeatValue: (value: boolean) => void;
  handleChangeTrackReordering: () => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

export const PlayerControls: FC<PlayerControlsType> = memo(
  ({
    skipSong,
    audioEl,
    handleChangeRepeatValue,
    handleChangeTrackReordering,
    isPlaying,
    setIsPlaying,
  }) => {
    const currentTime = useSelector(selectCurrentTime);
    const duration = useSelector(selectDuration);
    const isRepeat = useSelector(selectIsRepeat);

    const progressBarRef = useRef<HTMLInputElement>(null!);
    const animationRef = useRef<number | undefined>(undefined);

    const audio = audioEl.current;

    const dispatch = useDispatch();

    useEffect(() => {
      const seconds = Math.floor(audio.duration);
      dispatch(setDuration(seconds));
      progressBarRef.current.max = String(seconds);
    }, [audio.duration, audio.onloadedmetadata, audio.readyState, dispatch]);

    useEffect(() => {
      if (audio === null) {
        return;
      }
      const playNextSong = (): void => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              skipSong(true);
              audio.autoplay = true;
            })
            .catch(error => {
              console.log(error);
              // Auto-play was prevented
              // Show paused UI.
            });
        }
        console.log('следующий трек');
      };
      audio.addEventListener('ended', playNextSong);
      // eslint-disable-next-line consistent-return
      return () => {
        audio.removeEventListener('ended', playNextSong);
      };
    }, [audio, skipSong]);

    const changePlayerCurrentTime = (): void => {
      progressBarRef.current.style.setProperty(
        '--seek-before-width',
        `${(+progressBarRef.current.value / duration) * 100}%`,
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

    const handleChangeVolumeRange = useCallback(
      (value: number): void => {
        audio.volume = value;
      },
      [audio],
    );

    const handlePlayClick = (): void => {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        audio.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audio.pause();
        if (typeof animationRef.current === 'number') {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };

    return (
      <div className={styles.player_controls}>
        <div className={styles.playback_block}>
          <FaRandom
            className={styles.random_button}
            onClick={handleChangeTrackReordering}
            style={{ width: '13px', height: '13px', cursor: 'pointer' }}
          />
          <input
            type="range"
            defaultValue="0"
            className={styles.progressBar}
            ref={progressBarRef}
            onChange={changeRange}
          />
          <button className={styles.repeat_button} type="button">
            {isRepeat ? (
              <MdRepeatOne
                style={{ width: '13px', height: '13px' }}
                onClick={() => handleChangeRepeatValue(false)}
              />
            ) : (
              <MdRepeat
                style={{ width: '13px', height: '13px' }}
                onClick={() => handleChangeRepeatValue(true)}
              />
            )}
          </button>
        </div>
        <div className={styles.duration_block}>
          <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
          <div className={styles.duration}>
            {Number.isNaN(duration) ? (
              '--:--'
            ) : (
              <div className={styles.duration}>{calculateTime(duration)}</div>
            )}
          </div>
        </div>
        <div className={styles.buttons_group}>
          <button
            className={styles.skip_btn}
            type="button"
            onClick={() => skipSong(false)}
          >
            <IoPlayBack />
          </button>
          <button className={styles.play_btn} type="button" onClick={handlePlayClick}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className={styles.skip_btn}
            type="button"
            onClick={() => skipSong(true)}
          >
            <IoPlayForward />
          </button>
        </div>
        <VolumeSettings handleChangeVolumeRange={handleChangeVolumeRange} />
      </div>
    );
  },
);
