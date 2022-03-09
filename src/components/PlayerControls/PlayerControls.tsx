import { FC } from 'react';

import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { FaPlay, FaPause } from 'react-icons/fa';

type PlayerControlsType = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  skipSong: (forwards: boolean) => void;
};

export const PlayerControls: FC<PlayerControlsType> = ({
  skipSong,
  isPlaying,
  setIsPlaying,
}) => (
  <div className="c-player--controls">
    <button className="skip-btn" type="button" onClick={() => skipSong(false)}>
      <BsArrowLeftShort />
    </button>
    <button className="play-btn" type="button" onClick={() => setIsPlaying(!isPlaying)}>
      {isPlaying ? <FaPause /> : <FaPlay />}
    </button>
    <button className="skip-btn" type="button" onClick={() => skipSong(true)}>
      <BsArrowRightShort />
    </button>
  </div>
);
