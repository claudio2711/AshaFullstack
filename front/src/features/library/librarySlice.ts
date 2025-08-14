import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/app/api';

export interface Album {
  id: string;
  title: string;
  desc: string;
  cover: string;
  bgColor: string;
}

interface LibraryState {
  albumList: Album[];
  selected?: Album;
  loading: boolean;
  error?: string;
}

const initialState: LibraryState = { albumList: [], loading: false };

type AlbumDoc = {
  _id: string;
  name: string;
  desc?: string;
  bgColour?: string;
  image?: string;
};
type AlbumsAPI = AlbumDoc[] | { albums: AlbumDoc[] } | { data: AlbumDoc[] };

export const fetchAlbums = createAsyncThunk<Album[]>(
  'library/fetchAlbums',
  async () => {
    const { data } = await api.get<AlbumsAPI>('/album/list');
    const raw = Array.isArray(data) ? data : 'albums' in data ? data.albums : data.data;
    return raw.map((a) => ({
      id: a._id,
      title: a.name,
      desc: a.desc ?? '',
      cover: a.image ?? '',
      bgColor: a.bgColour ?? '#121212',
    }));
  }
);

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    selectAlbum: (s, a: PayloadAction<string>) => {
      s.selected = s.albumList.find(alb => alb.id === a.payload);
    },
    clearAlbum: (s) => { s.selected = undefined; },
  },
  extraReducers: (b) => {
    b.addCase(fetchAlbums.pending,   s => { s.loading = true; s.error = undefined; });
    b.addCase(fetchAlbums.fulfilled, (s, a) => { s.loading = false; s.albumList = a.payload; });
    b.addCase(fetchAlbums.rejected,  (s, a) => { s.loading = false; s.error = a.error?.message; });
  }
});

export const { selectAlbum, clearAlbum } = librarySlice.actions;
export default librarySlice.reducer;
