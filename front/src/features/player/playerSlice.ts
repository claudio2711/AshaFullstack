import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Song } from '@/types/music';
//import songs from '@/data/songs.json';

/** ───────── State ───────── */
interface PlayerState {
  /** indice del brano corrente in `songs` */
  currentId: number;
  /** true se in riproduzione */
  playing: boolean;
  /** posizione corrente (secondi) */
  position: number;
  /** durata del brano attuale (secondi) */
  duration: number;
}

const initialState: PlayerState = {
  currentId: 0,
  playing: false,
  position: 0,
  duration: 0,
};

/** ───────── Slice ───────── */
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play(state)   { state.playing = true;  },
    pause(state)  { state.playing = false; },

    /** passa a un brano con indice noto */
    setTrack(state, a: PayloadAction<number>) {
      state.currentId = a.payload;
      state.position  = 0;
    },

    /** brano precedente / successivo */
    previous(state) {
      if (state.currentId > 0) state.currentId -= 1;
      state.position = 0;
    },
    next(state) {
      if (state.currentId < (songs as Song[]).length - 1) state.currentId += 1;
      state.position = 0;
    },

    /** aggiornamento barra di avanzamento */
    seek(state, a: PayloadAction<number>)      { state.position = a.payload; },
    setDuration(state, a: PayloadAction<number>) { state.duration = a.payload; },
  },
});

export const {
  play, pause, setTrack, previous, next, seek, setDuration,
} = playerSlice.actions;

export default playerSlice.reducer;
