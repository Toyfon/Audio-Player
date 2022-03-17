import { FC, memo, useCallback, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { changeTracksOrder, setRepeatValue } from 'bll/player-slice';
import { selectIsRepeat, selectSongs } from 'bll/selectors/player-selectors';
import styles from 'components/Player/player.module.css';
import { PlayerControls } from 'components/PlayerControls/PlayerControls';
import { PlayerDetails } from 'components/PlayerDetails/PlayerDetails';

type PlayerPropsType = {
  currentSongIndex: number;
  setCurrentSongIndex: (currentSongIndex: () => number) => void;
  nextSongIndex: number;
};

export const Player: FC<PlayerPropsType> = memo(
  ({ currentSongIndex, setCurrentSongIndex, nextSongIndex }) => {
    const songs = useSelector(selectSongs);
    const audioEl = useRef<HTMLAudioElement>(new Audio(songs[currentSongIndex].src));
    const isRepeat = useSelector(selectIsRepeat);
    // console.log(isRepeat);
    // console.log(songs);
    console.log('PLAYER RENDER');

    const dispatch = useDispatch();

    const skipSong = (forwards: boolean = true): void => {
      if (forwards) {
        setCurrentSongIndex(() => {
          let temp = currentSongIndex;
          temp += 1;
          if (temp > songs.length - 1) {
            temp = 0;
          }
          return temp;
        });
      } else {
        setCurrentSongIndex(() => {
          let temp = currentSongIndex;
          temp -= 1;
          if (temp < 0) {
            temp = songs.length - 1;
          }
          return temp;
        });
      }
    };
    const handleChangeRepeatValue = useCallback((): void => {
      dispatch(setRepeatValue(!isRepeat));
    }, [dispatch]);

    const handleChangeTrackReordering = useCallback((): void => {
      // console.log('change');
      dispatch(changeTracksOrder());
    }, [dispatch]);

    return (
      <div className={styles.player}>
        <audio loop={isRepeat} ref={audioEl} src={songs[currentSongIndex].src}>
          <track kind="captions" />
        </audio>
        <h4>Playing now</h4>
        <PlayerDetails song={songs[currentSongIndex]} />
        <PlayerControls
          skipSong={skipSong}
          audioEl={audioEl}
          currentSongIndex={currentSongIndex}
          handleChangeRepeatValue={handleChangeRepeatValue}
          handleChangeTrackReordering={handleChangeTrackReordering}
        />
        <p>
          <strong>Next up:</strong> {songs[nextSongIndex].title} by{' '}
          {songs[nextSongIndex].artist}
        </p>
      </div>
    );
  },
);
