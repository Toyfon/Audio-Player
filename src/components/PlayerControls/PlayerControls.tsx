import { FC, memo, MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { FaPause, FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentTime, setDuration } from 'bll/player-slice';
import { selectCurrentTime, selectDuration } from 'bll/selectors/player-selectors';
import { PlayBackButton } from 'components/PlayBackButton/PlayBackButton';
import styles from 'components/PlayerControls/PlayerControls.module.css';
import { VolumeSettings } from 'components/PlayerControls/VolumeBlock/VolumeSettings';
import { PlayForwardButton } from 'components/PlayForwardButton/PlayForwardButton';
import { RandomButton } from 'components/RandomButton/RandomButton';
import { RepeatButton } from 'components/RepeatButton/RepeatButton';
import { calculateTime } from 'utils/calculateTimeUtil';

type PlayerControlsType = {
  skipSong: (forwards: boolean) => void;
  audioEl: MutableRefObject<HTMLAudioElement>;
  currentSongIndex: number;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

export const PlayerControls: FC<PlayerControlsType> = memo(
  ({ skipSong, audioEl, isPlaying, setIsPlaying }) => {
    const currentTime = useSelector(selectCurrentTime);
    const duration = useSelector(selectDuration);

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
      };
      audio.addEventListener('ended', playNextSong);
      return () => {
        audio.removeEventListener('ended', playNextSong);
      };
    }, [audio, skipSong]);

    const changePlayerCurrentTime = useCallback((): void => {
      progressBarRef.current.style.setProperty(
        '--seek-before-width',
        `${(+progressBarRef.current.value / duration) * 100}%`,
      );
      dispatch(setCurrentTime(Number(progressBarRef.current.value)));
    }, [dispatch, duration]);

    const changeRange = useCallback((): void => {
      audio.currentTime = Number(progressBarRef.current.value);
      changePlayerCurrentTime();
    }, [audio, changePlayerCurrentTime]);

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

    // const handlePlayClick = (): void => {
    //   setIsPlaying(!isPlaying);
    //   if (!isPlaying) {
    //     audio.play();
    //     animationRef.current = requestAnimationFrame(whilePlaying);
    //   } else {
    //     audio.pause();
    //     if (typeof animationRef.current === 'number') {
    //       cancelAnimationFrame(animationRef.current);
    //     }
    //   }
    // };
    const handlePlayClick = async (): Promise<void> => {
      try {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
          await audio.play();
          animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
          await audio.pause();
          if (typeof animationRef.current === 'number') {
            cancelAnimationFrame(animationRef.current);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <div className={styles.player_controls}>
        <div className={styles.playback_block}>
          <RandomButton />
          <input
            type="range"
            defaultValue="0"
            className={styles.progressBar}
            ref={progressBarRef}
            onChange={changeRange}
          />
          <RepeatButton />
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
          <PlayBackButton skipSong={skipSong} />
          <button className={styles.play_btn} type="button" onClick={handlePlayClick}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <PlayForwardButton skipSong={skipSong} />
        </div>
        <VolumeSettings handleChangeVolumeRange={handleChangeVolumeRange} />
      </div>
    );
  },
);
