import { createSlice } from '@reduxjs/toolkit';
import songs from '@/data/songs.json';

export interface Song {
  id: number;
  title: string;
  albumId: string;
  albumTitle: string;
  cover: string;
  src: string;
  duration: string;   // "m:ss"
  artist: string;
  date: string;
}

interface SongsState {
  list: Song[];
}

const initialState: SongsState = { list: songs as Song[] };

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
});

export default songsSlice.reducer;
