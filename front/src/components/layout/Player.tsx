import React, { useEffect, useRef, MouseEvent } from 'react';
import { assets } from '@/assets/assets';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { play, pause, previous, next, seek, setDuration } from '@/features/player/playerSlice';
import type { Song } from '@/features/songs/songsSlice';

const toClock = (s: number) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

const Player: React.FC = () => {
  const dispatch = useAppDispatch();

  // stato globale
  const { currentId, playing, position, duration } = useAppSelector(s => s.player);
  const queue = useAppSelector(s => s.songs.list as Song[]);
  const track: Song | undefined = queue[currentId];
  const trackSrc: string | undefined = track?.src;

  // refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBg   = useRef<HTMLDivElement>(null);

  // mantieni "playing" in una ref per usarlo in onCanPlay
  const playingRef = useRef(false);
  useEffect(() => { playingRef.current = playing; }, [playing]);

  // sync play/pause esplicito
  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    if (playing) void a.play().catch(() => {});
    else a.pause();
  }, [playing]);

  // quando CAMBIA SOLO la src della traccia: reset, ricarica metadata, autoplay se eravamo in play
  useEffect(() => {
    const a = audioRef.current; if (!a || !trackSrc) return;
    a.currentTime = 0;
    a.load();

    const onCanPlay = () => { if (playingRef.current) void a.play().catch(() => {}); };
    a.addEventListener('canplay', onCanPlay);
    return () => a.removeEventListener('canplay', onCanPlay);
  }, [trackSrc]);

  // click sulla barra di seek
  const onSeekClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current, bg = seekBg.current;
    if (!a || !bg || !isFinite(a.duration) || a.duration <= 0) return;
    const rect = bg.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const t = pct * a.duration;
    a.currentTime = t;
    dispatch(seek(t));
  };

  if (!track) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#0f172a] text-white flex items-center px-4">
        <div className="text-sm opacity-70">No tracks</div>
      </div>
    );
  }

  const goNext = () => {
    dispatch(next(queue.length)); // passa la lunghezza della coda
    dispatch(play());             // resta in riproduzione
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a] text-white px-4 py-3 flex items-center gap-4">
      {/* left: cover + info */}
      <div className="flex items-center gap-3 min-w-0 w-[28%]">
        <img src={track.cover} alt={track.title} className="w-12 h-12 rounded object-cover" />
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{track.title}</p>
          <p className="text-xs text-gray-400 truncate">{track.artist}</p>
        </div>
      </div>

      {/* center: controls + seek */}
      <div className="flex flex-col items-center justify-center w-[44%] mx-auto gap-2">
        <div className="flex items-center gap-5">
          <img src={assets.shuffle_icon} className="w-4 cursor-pointer" />
          <img src={assets.prev_icon} className="w-4 cursor-pointer" onClick={() => dispatch(previous())} />
          {playing ? (
            <img src={assets.pause_icon} className="w-6 cursor-pointer" onClick={() => dispatch(pause())} />
          ) : (
            <img src={assets.play_icon} className="w-6 cursor-pointer" onClick={() => dispatch(play())} />
          )}
          <img src={assets.next_icon} className="w-4 cursor-pointer" onClick={goNext} />
          <img src={assets.loop_icon} className="w-4 cursor-pointer" />
        </div>

        <div className="flex items-center gap-3 w-full">
          <span className="text-[11px] tabular-nums">{toClock(position)}</span>
          <div
            ref={seekBg}
            onClick={onSeekClick}
            className="relative h-1 w-full bg-white/20 rounded cursor-pointer"
          >
            <div
              className="absolute left-0 top-0 h-1 bg-white rounded"
              style={{ width: duration ? `${(position / duration) * 100}%` : '0%' }}
            />
          </div>
          <span className="text-[11px] tabular-nums">{toClock(duration)}</span>
        </div>
      </div>

      {/* right: extra */}
      <div className="ml-auto flex items-center gap-4 opacity-80">
        <img className="w-4" src={assets.volume_icon} />
        <img className="w-4" src={assets.mini_player_icon} />
        <img className="w-4" src={assets.zoom_icon} />
      </div>

      {/* audio element */}
      <audio
        ref={audioRef}
        src={trackSrc}
        preload="metadata"
        crossOrigin="anonymous"
        onTimeUpdate={e => dispatch(seek(e.currentTarget.currentTime || 0))}
        onLoadedMetadata={e => dispatch(setDuration(e.currentTarget.duration || 0))}
        onEnded={goNext}
        className="hidden"
      />
    </div>
  );
};

export default React.memo(Player);

