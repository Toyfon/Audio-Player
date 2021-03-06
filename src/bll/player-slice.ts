import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SongType } from 'types/song-type';

const songs: SongType[] = [
  {
    id: 1,
    title: 'Out of time',
    artist: 'Monrroe feat Zara Kershaw',
    img_src: './images/monrroe.jpg',
    src: './music/Monrroe.mp3',
  },
  {
    id: 2,
    title: '.223',
    artist: 'Bones',
    img_src: './images/bones-223.jpg',
    src: './music/bones-223.mp3',
  },
  {
    id: 3,
    title: 'Малый повзрослел',
    artist: 'Макс Корж',
    img_src: './images/Maks.jpg',
    src: './music/Maks.mp3',
  },
  {
    id: 4,
    title: 'HUMBLE',
    artist: 'Kendrick Lamar ',
    img_src: './images/Kendrick.jpg',
    src: './music/kendrick-lamar_-_humble.mp3',
  },
  {
    id: 5,
    title: 'No time',
    artist: 'Iceberg Black, Ghostemane',
    img_src: './images/iceberg.jpg',
    src: './music/iceberg.mp3',
  },
  {
    id: 6,
    title: 'Worry About Me',
    artist: 'Ellie Goulding & blackbear',
    img_src: './images/ellie.jpg',
    src: './music/Ellie.mp3',
  },
  {
    id: 7,
    title: 'All the stars',
    artist: 'Kendrick Lamar & SZA',
    img_src: './images/kendrick_sza.png',
    src: './music/Kendrick_SZA.mp3',
  },
];

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    songs,
    currentTime: 0,
    duration: 0,
    isRepeat: false,
    isMuted: false,
  },
  reducers: {
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setRepeatValue: (state, action: PayloadAction<boolean>) => {
      state.isRepeat = action.payload;
    },
    changeTracksOrder: state => {
      state.songs = state.songs.sort(() => Math.random() - 0.5);
    },
    setMuteVolume: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
  },
});

export const {
  setCurrentTime,
  setDuration,
  setRepeatValue,
  changeTracksOrder,
  setMuteVolume,
} = playerSlice.actions;
export default playerSlice.reducer;
