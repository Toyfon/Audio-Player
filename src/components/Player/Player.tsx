import { FC, memo, useRef } from 'react';

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

export const Player: FC<PlayerType> = memo(
  ({ currentSongIndex, setCurrentSongIndex, nextSongIndex }) => {
    const songs = useSelector(selectSongs);
    const audioEl = useRef<HTMLAudioElement>(new Audio(songs[currentSongIndex].src));

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

    return (
      <div className={styles.player}>
        <audio ref={audioEl} src={songs[currentSongIndex].src}>
          <track kind="captions" />
        </audio>
        <h4>Playing now</h4>
        <PlayerDetails song={songs[currentSongIndex]} />
        <PlayerControls
          skipSong={skipSong}
          audioEl={audioEl}
          currentSongIndex={currentSongIndex}
        />
        <p>
          <strong>Next up:</strong> {songs[nextSongIndex].title} by{' '}
          {songs[nextSongIndex].artist}
        </p>
      </div>
    );
  },
);
