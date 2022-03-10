import { configureStore } from '@reduxjs/toolkit';

import playerReducer from 'bll/player-slice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
