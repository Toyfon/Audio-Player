import { RootStateType } from 'bll/store';
import { SongType } from 'types/song-type';

export const selectSongs = (state: RootStateType): SongType[] => state.player.songs;
export const selectСurrentSongIndex = (state: RootStateType): number =>
  state.player.currentSongIndex;
