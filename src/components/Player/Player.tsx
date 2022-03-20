import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { changeTracksOrder, setRepeatValue } from 'bll/player-slice';
import { selectIsRepeat } from 'bll/selectors/player-selectors';
import { RootStateType } from 'bll/store';
import styles from 'components/Player/player.module.css';
import { PlayerControls } from 'components/PlayerControls/PlayerControls';
import { PlayerDetails } from 'components/PlayerDetails/PlayerDetails';

export const Player: FC = () => {
  const songs = useSelector<RootStateType, any>(state => state.player.songs);
  const isRepeat = useSelector(selectIsRepeat);
  const dispatch = useDispatch();

  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [nextSongIndex, setNextSongIndex] = useState<number>(currentSongIndex + 1);

  const audioEl = useRef<HTMLAudioElement>(new Audio(songs[currentSongIndex].src));
  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      }
      return currentSongIndex + 1;
    });
  }, [currentSongIndex, songs.length]);

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
  const handleChangeRepeatValue = useCallback(
    (value: boolean): void => {
      dispatch(setRepeatValue(value));
    },
    [dispatch],
  );

  const handleChangeTrackReordering = useCallback((): void => {
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
};
