import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import albums from '@/data/albums.json';

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
}

const initialState: LibraryState = {
  albumList: albums as Album[],
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    /** salva l’album scelto */
    selectAlbum: (s, a: PayloadAction<string>) => {
      s.selected = s.albumList.find(alb => alb.id === a.payload);
    },
    /** resetta (torno a Home) */
    clearAlbum: (s) => { delete s.selected; },
  },
});

export const { selectAlbum, clearAlbum } = librarySlice.actions;
export default librarySlice.reducer;
