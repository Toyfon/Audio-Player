import { FC, useCallback } from 'react';

import { FaPlay } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { selectSongs } from 'bll/selectors/player-selectors';
import styles from 'components/Playlist/playlist.module.css';

type PlayListPropsType = {
  callback: (id: number) => void;
};

export const PlayList: FC<PlayListPropsType> = ({ callback }) => {
  const songs = useSelector(selectSongs);

  const playCurrentTrack = useCallback(
    (songIndex: number): void => {
      callback(songIndex);
    },
    [callback],
  );
  return (
    <div className={styles.playlist_container}>
      {songs.map(song => (
        <div key={song.id} className={styles.playlist_element}>
          <span>
            <strong>{song.artist} </strong>
          </span>
          <span style={{ color: 'grey' }}>{song.title} </span>
          <FaPlay
            onClick={() => playCurrentTrack(songs.indexOf(song))}
            style={{ width: '10px', height: '10px' }}
          />
        </div>
      ))}
    </div>
  );
};
