import { FC, memo } from 'react';

import styles from 'components/PlayerDetails/playerDetails.module.css';
import { SongType } from 'types/song-type';

type PlayerDetailsType = {
  song: SongType;
};

export const PlayerDetails: FC<PlayerDetailsType> = memo(({ song }) => (
  <div className={styles.player_details}>
    <div className={styles.details_img}>
      <img src={song.img_src} alt="track cover" />
    </div>
    <h3 className={styles.details_title}>{song.title}</h3>
    <h4 className={styles.details_artist}>{song.artist}</h4>
  </div>
));
