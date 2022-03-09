import './App.css';
import { FC, useState, useEffect } from 'react';

import { Player } from 'components/Player/Player';
import { TrackType } from 'types/track-type';

export const App: FC = () => {
  const [songs] = useState<TrackType[]>([
    {
      title: '.223',
      artist: 'Bones',
      img_src: './images/bones-223.jpg',
      src: './music/bones-223.mp3',
    },
    {
      title: 'Малый повзрослел',
      artist: 'Макс Корж',
      img_src: './images/Maks.jpg',
      src: './music/Maks.mp3',
    },
  ]);

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
        songs={songs}
      />
    </div>
  );
};
