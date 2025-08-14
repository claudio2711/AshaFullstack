import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/app/api';

export interface Song {
  id: number;           // indice in lista (compat col player)
  title: string;
  albumId: string;
  albumTitle: string;
  cover: string;
  src: string;
  duration: string;
  artist: string;
  date: string;
}

interface SongsState { list: Song[]; loading: boolean; error?: string; }
const initialState: SongsState = { list: [], loading: false };

type SongDoc = {
  _id: string;
  name: string;
  desc?: string;
  album?: string;         // back attuale
  albumId?: string;       // compat
  albumName?: string;
  image?: string;         // cover
  file: string;           // audio url
  duration?: string;
  createdAt?: string;
};
type SongsAPI = SongDoc[] | { tracce: SongDoc[] } | { data: SongDoc[] };

export const fetchSongs = createAsyncThunk<Song[]>(
  'songs/fetchSongs',
  async () => {
    const { data } = await api.get<SongsAPI>('/song/list');
    const raw = Array.isArray(data) ? data : ('tracce' in data ? data.tracce : data.data);

    return raw.map((s, i) => ({
      id: i,
      title: s.name,
      albumId: s.albumId ?? s.album ?? '',
      albumTitle: s.albumName ?? '',
      cover: s.image ?? '',
      src: s.file,
      duration: s.duration ?? '0:00',
      artist: s.desc ?? '',
      date: s.createdAt ?? new Date().toISOString(),
    }));
  }
);

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchSongs.pending,   s => { s.loading = true;  s.error = undefined; });
    b.addCase(fetchSongs.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; });
    b.addCase(fetchSongs.rejected,  (s, a) => { s.loading = false; s.error = a.error?.message; });
  }
});

export default songsSlice.reducer;
