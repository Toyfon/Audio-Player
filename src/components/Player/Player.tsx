import { FC, useState, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

import { selectSongs } from 'bll/selectors/player-selectors';
import styles from 'components/Player/player.module.css';
import { PlayerControls } from 'components/PlayerControls/PlayerControls';
import { PlayerDetails } from 'components/PlayerDetails/PlayerDetails';

type PlayerType = {
  currentSongIndex: number;
  setCurrentSongIndex: (currentSongIndex: () => number) => void;
  nextSongIndex: number;
};

export const Player: FC<PlayerType> = ({
  currentSongIndex,
  setCurrentSongIndex,
  nextSongIndex,
}) => {
  const songs = useSelector(selectSongs);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioEl = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const skipSong = (forwards: boolean = true): void => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-plusplus
        temp++;

        if (temp > songs.length - 1) {
          temp = 0;
        }
        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-plusplus
        temp--;

        if (temp < 0) {
          temp = songs.length - 1;
        }
        return temp;
      });
    }
  };

  return (
    <div className={styles.player}>
      <audio preload="metadata" ref={audioEl} src={songs[currentSongIndex].src}>
        <track kind="captions" />
      </audio>
      <h4>Playing now</h4>
      <PlayerDetails song={songs[currentSongIndex]} />
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        skipSong={skipSong}
        audioEl={audioEl}
      />
      <p>
        <strong>Next up:</strong> {songs[nextSongIndex].title} by{' '}
        {songs[nextSongIndex].artist}
      </p>
    </div>
  );
};
