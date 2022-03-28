import { RootStateType } from 'bll/store';
import { SongType } from 'types/song-type';

export const selectSongs = (state: RootStateType): SongType[] => state.player.songs;
export const selectCurrentSongIndex = (state: RootStateType): number =>
  state.player.currentSongIndex;
export const selectCurrentTime = (state: RootStateType): number =>
  state.player.currentTime;
export const selectDuration = (state: RootStateType): number => state.player.duration;
export const selectIsRepeat = (state: RootStateType): boolean => state.player.isRepeat;
export const selectIsMuted = (state: RootStateType): boolean => state.player.isMuted;
