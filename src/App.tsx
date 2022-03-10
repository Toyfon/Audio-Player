import { FC, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { selectSongs } from 'bll/selectors/player-selectors';
import { Player } from 'components/Player/Player';
import './App.css';

export const App: FC = () => {
  const songs = useSelector(selectSongs);

  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [nextSongIndex, setNextSongIndex] = useState<number>(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      }
      return currentSongIndex + 1;
    });
  }, [currentSongIndex]);

  return (
    <div className="App">
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
      />
    </div>
  );
};
