// src/hooks/PlayerContext.tsx
// eslint-disable-next-line react-refresh/only-export-components
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  MouseEvent,
} from 'react';

import type { Song } from '@/types/music';
import type { TimeState } from '@/types/player';
import songsRaw from '@/data/songs.json';

const songs = songsRaw as Song[];

interface PlayerContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  seekBg:   React.RefObject<HTMLDivElement>;
  seekBar:  React.RefObject<HTMLHRElement>;
  track:    Song;
  playStatus: boolean;
  time:     TimeState;
  play:     () => void;
  pause:    () => void;
  playWithId: (id: number) => void;
  previous: () => void;
  next:     () => void;
  seekSong: (e: MouseEvent<HTMLDivElement>) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<ProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBg   = useRef<HTMLDivElement>(null);
  const seekBar  = useRef<HTMLHRElement>(null);

  const [track, setTrack] = useState<Song>(songs[0]);
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const [time, setTime] = useState<TimeState>({
    currentTime: { minute: 0, second: 0 },
    totalTime:   { minute: 0, second: 0 },
  });

  /* ─────────── Playback controls ─────────── */
  const play = () => {
    if (!audioRef.current) return;
    void audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlayStatus(false);
  };

  const playWithId = (id: number) => {
    const nextTrack = songs[id];
    if (!nextTrack) return;
    setTrack(nextTrack);
    // attendiamo il tick successivo affinché React aggiorni <audio src=...>
    setTimeout(() => {
      if (!audioRef.current) return;
      audioRef.current.currentTime = 0;
      void audioRef.current.play();
      setPlayStatus(true);
    });
  };

  const previous = () => {
    if (track.id > 0) playWithId(track.id - 1);
  };

  const next = () => {
    if (track.id < songs.length - 1) playWithId(track.id + 1);
  };

  const seekSong = (e: MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    const bg = seekBg.current;
    if (!a || !bg) return;
    const pct = e.nativeEvent.offsetX / bg.offsetWidth;
    a.currentTime = pct * (a.duration || 0);
  };

  /* ─────────── Time & Progress update ─────────── */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTimeUpdate = () => {
      if (seekBar.current && a.duration) {
        seekBar.current.style.width = `${(a.currentTime / a.duration) * 100}%`;
      }
      setTime({
        currentTime: {
          minute: Math.floor(a.currentTime / 60),
          second: Math.floor(a.currentTime % 60),
        },
        totalTime: {
          minute: Math.floor(a.duration / 60) || 0,
          second: Math.floor(a.duration % 60) || 0,
        },
      });
    };

    a.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      a.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBg,
        seekBar,
        track,
        playStatus,
        time,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error('usePlayer must be used within <PlayerProvider>');
  }
  return ctx;
};

export default PlayerContext;
