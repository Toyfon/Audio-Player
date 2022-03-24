import { FC, useCallback } from 'react';

import { FaPlay } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { selectSongs } from 'bll/selectors/player-selectors';

type PlayListPropsType = {
  callback: (id: number) => void;
};

export const PlayList: FC<PlayListPropsType> = ({ callback }) => {
  const songs = useSelector(selectSongs);

  const playCurrentTrack = useCallback((songIndex: number): void => {
    console.log(songIndex);
    callback(songIndex);
  }, []);
  return (
    <div>
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            <span>
              <strong>{song.artist} </strong>
            </span>
            <span>{song.title} </span>
            <FaPlay
              onClick={() => playCurrentTrack(songs.indexOf(song))}
              style={{ width: '10px', height: '10px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
