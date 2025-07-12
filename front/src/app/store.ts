import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from '@/features/library/librarySlice';
import songsReducer   from '@/features/songs/songsSlice';
import playerReducer from '@/features/player/playerSlice';

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    songs:   songsReducer,
     player: playerReducer   
  },
  devTools: true,
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
