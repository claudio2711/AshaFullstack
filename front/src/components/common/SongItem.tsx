import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setTrack, play } from '@/features/player/playerSlice';
import type { Song } from '@/features/songs/songsSlice';
import { formatDistanceToNowStrict } from 'date-fns';

interface Props {
  track: Song;
  index: number;
  onClick?: (t: Song) => void;
}

const SongItem: React.FC<Props> = ({ track, index, onClick }) => {
  const dispatch = useAppDispatch();
  const { currentId } = useAppSelector(s => s.player);
  const active      = currentId === track.id;

  /* durata “mm:ss” */
  const duration =
    track.duration.includes(':')
      ? track.duration
      : `${Math.floor(+track.duration / 60)}:${String(+track.duration % 60).padStart(2, '0')}`;

  const handleClick = () => {
    if (onClick) return onClick(track);      // callback esterna (per album view)
    dispatch(setTrack(track.id));            // seleziona brano
    dispatch(play());                        // avvia riproduzione
  };

  return (
    <div
      onClick={handleClick}
      className={`
        grid grid-cols-[32px_40px_1fr_160px_120px_48px] items-center gap-4
        py-2 px-3 rounded cursor-pointer select-none
        hover:bg-white/5 ${active ? 'bg-white/10' : ''}
      `}
    >
      {/* # */}
      <span className="text-sm text-gray-400 w-6 text-right">{index + 1}</span>

      {/* cover */}
      <img src={track.cover} alt={track.title} className="w-10 h-10 rounded object-cover" />

      {/* titolo + artista */}
      <div className="flex flex-col overflow-hidden">
        <p className="truncate">{track.title}</p>
        <p className="text-sm text-gray-300 truncate">{track.artist}</p>
      </div>

      {/* album */}
      <p className="text-sm text-gray-300 truncate">{track.albumTitle}</p>

      {/* data aggiunta */}
      <p className="text-sm text-gray-400">
        {formatDistanceToNowStrict(new Date(track.date), { addSuffix: true })}
      </p>

      {/* durata */}
      <span className="text-sm text-gray-400 text-right">{duration}</span>
    </div>
  );
};

export default memo(SongItem);
