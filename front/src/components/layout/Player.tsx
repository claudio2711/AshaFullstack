/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/layout/Player.tsx
import { useRef, useEffect, memo, MouseEvent } from 'react';
import { assets } from '@/assets/assets';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  play, pause, previous, next,
  seek, setDuration,
} from '@/features/player/playerSlice';

const Player: React.FC = () => {
  const dispatch = useAppDispatch();

  /* stato redux */
  const { currentId, playing, position, duration } = useAppSelector(s => s.player);
  const queue = useAppSelector(s => s.songs.list);
  const track = queue[currentId];

  /* ref DOM */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekBg   = useRef<HTMLDivElement | null>(null);
  const seekBar  = useRef<HTMLDivElement | null>(null);

  /* se non c’è traccia, svuota l’audio per sicurezza */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (!track) {
      a.pause();
      a.removeAttribute('src');
    }
  }, [track]);

 // play/pause
useEffect(() => {
  const a = audioRef.current;
  if (!a || !track) return;
  playing ? a.play().catch(() => {}) : a.pause();
}, [playing, track]);

// sync progress/durata
useEffect(() => {
  const a = audioRef.current;
  if (!a || !track) return;
  const timeUpdate = () => { /* ... */ };
  const loaded = () => { /* ... */ };
  a.addEventListener('timeupdate', timeUpdate);
  a.addEventListener('loadedmetadata', loaded);
  return () => {
    a.removeEventListener('timeupdate', timeUpdate);
    a.removeEventListener('loadedmetadata', loaded);
  };
}, [dispatch, track, position]);

  /* click seek */
  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
    const bg = seekBg.current;
    const a  = audioRef.current;
    if (!bg || !a || !track || !a.duration) return;
    const rect = bg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    a.currentTime = pct * a.duration;
  };

  const fmt = (v: number) => {
    const m = Math.floor((v || 0) / 60);
    const s = Math.floor((v || 0) % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  /* ── niente crash quando i dati non sono ancora arrivati ── */
  if (!track) {
    return (
      <div className="h-[10%] bg-gradient-to-b from-[#1A2149] to-black/90 flex items-center px-4 rounded-tl-2xl rounded-tr-2xl" />
    );
  }

  return (
    <div className="h-[10%] bg-gradient-to-b from-[#1A2149] to-black/90 flex justify-between items-center text-white px-4 select-none rounded-tl-2xl rounded-tr-2xl">

      {/* left: cover & text */}
      <div className="flex items-center gap-3 w-1/4">
        <img src={track.cover} className="w-12 h-12 rounded object-cover" />
        <div className="flex flex-col">
          <p className="truncate max-w-[140px]">{track.title}</p>
          <p className="text-sm text-gray-300 truncate max-w-[140px]">{track.artist || track.albumTitle}</p>
        </div>
      </div>

      {/* centre: controls & progress */}
      <div className="flex flex-col items-center gap-2 flex-1">
        <div className="flex items-center gap-5">
          <img src={assets.shuffle_icon} className="w-4 cursor-pointer" />
          <img src={assets.prev_icon} className="w-4 cursor-pointer" onClick={() => dispatch(previous())} />
          {playing
            ? <img src={assets.pause_icon} className="w-6 cursor-pointer" onClick={() => dispatch(pause())} />
            : <img src={assets.play_icon}  className="w-6 cursor-pointer" onClick={() => dispatch(play())}  />}
          <img src={assets.next_icon} className="w-4 cursor-pointer" onClick={() => dispatch(next())} />
          <img src={assets.loop_icon} className="w-4 cursor-pointer" />
        </div>

        <div className="flex items-center gap-2 w-full">
          <span className="text-[10px] w-8 text-right">{fmt(position)}</span>
          <div ref={seekBg} className="flex-1 h-1 bg-white/30 rounded cursor-pointer relative" onClick={handleSeek}>
            <div ref={seekBar} className="absolute h-full bg-white rounded" />
          </div>
          <span className="text-[10px] w-8">{fmt(duration)}</span>
        </div>
      </div>

      {/* right: misc */}
      <div className="flex items-center gap-3 w-1/4 justify-end">
        <img className="w-4" src={assets.volume_icon}  />
        <div className="w-20 bg-white/30 h-1 rounded" />
        <img className="w-4" src={assets.mini_player_icon} />
        <img className="w-4" src={assets.zoom_icon} />
      </div>

      {/* hidden audio */}
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onEnded={() => dispatch(next())}
        className="hidden"
      />
    </div>
  );
};

export default memo(Player);
