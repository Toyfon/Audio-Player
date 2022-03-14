import { createSlice } from '@reduxjs/toolkit';

import { SongType } from 'types/song-type';

const songs: SongType[] = [
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
  {
    title: 'HUMBLE',
    artist: 'Kendrick Lamar ',
    img_src: './images/Kendrick.jpg',
    src: './music/kendrick-lamar_-_humble.mp3',
  },
  {
    title: 'Out of time',
    artist: 'Monrroe feat Zara Kershaw',
    img_src: './images/monrroe.jpg',
    src: './music/Monrroe.mp3',
  },
  {
    title: 'No time',
    artist: ' Iceberg Black, Ghostemane',
    img_src: './images/iceberg.jpg',
    src: './music/iceberg.mp3',
  },
  {
    title: 'Ягода малина',
    artist: 'Валентина Легкоступова',
    img_src: './images/valentina.jpg',
    src: './music/valentina.mp3',
  },
];

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    songs,
    currentSongIndex: 0,
    nextSongIndex: 0,
  },
  reducers: {},
});

// export const {} = playerSlice.actions;
export default playerSlice.reducer;
