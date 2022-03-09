import { FC } from 'react';

import { TrackType } from 'types/track-type';

type PlayerDetailsType = {
  song: TrackType;
};

export const PlayerDetails: FC<PlayerDetailsType> = ({ song }) => (
  <div className="c-player--details">
    <div className="details-image">
      <img src={song.img_src} alt="track cover" />
    </div>
    <h3 className="details-title">{song.title}</h3>
    <h4 className="details-artist">{song.artist}</h4>
  </div>
);
