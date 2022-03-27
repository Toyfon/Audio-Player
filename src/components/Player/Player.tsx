import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { changeTracksOrder, setRepeatValue } from 'bll/player-slice';
import { selectIsRepeat, selectSongs } from 'bll/selectors/player-selectors';
import styles from 'components/Player/player.module.css';
import { PlayerControls } from 'components/PlayerControls/PlayerControls';
import { PlayerDetails } from 'components/PlayerDetails/PlayerDetails';
import { PlayList } from 'components/Playlist/PlayList';

export const Player: FC = () => {
  const songs = useSelector(selectSongs);
  const isRepeat = useSelector(selectIsRepeat);

  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [nextSongIndex, setNextSongIndex] = useState<number>(currentSongIndex + 1);
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioEl = useRef<HTMLAudioElement>(new Audio(songs[currentSongIndex].src));
  const audio = audioEl.current;
  console.log(audio);

  const dispatch = useDispatch();

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
        audio.autoplay = true;
        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp -= 1;
        if (temp < 0) {
          temp = songs.length - 1;
        }
        audio.autoplay = true;
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

  const handleShowPlaylistOnClick = useCallback((): void => {
    setIsShowPlaylist(!isShowPlaylist);
  }, [isShowPlaylist]);

  const callback = useCallback(
    (songIndex: number): void => {
      setCurrentSongIndex(songIndex);
      audio.autoplay = true;
      setIsPlaying(true);
    },
    [audio],
  );

  return (
    <div className={styles.player}>
      <audio loop={isRepeat} ref={audioEl} src={songs[currentSongIndex].src}>
        <track kind="captions" />
      </audio>
      {isShowPlaylist && <PlayList callback={callback} />}
      <h4>Playing now</h4>
      <PlayerDetails song={songs[currentSongIndex]} />
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        skipSong={skipSong}
        audioEl={audioEl}
        currentSongIndex={currentSongIndex}
        handleChangeRepeatValue={handleChangeRepeatValue}
        handleChangeTrackReordering={handleChangeTrackReordering}
      />
      <AiOutlineMenu
        className={styles.open_playlist}
        onClick={handleShowPlaylistOnClick}
      />
      <p>
        <strong>Next up:</strong> {songs[nextSongIndex].title} by{' '}
        {songs[nextSongIndex].artist}
      </p>
    </div>
  );
};
