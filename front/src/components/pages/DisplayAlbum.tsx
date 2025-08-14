// src/components/pages/DisplayAlbum.tsx
import { useEffect, useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import type { Album } from '@/features/library/librarySlice';
import type { Song } from '@/features/songs/songsSlice';

import { selectAlbum } from '@/features/library/librarySlice';
import SongItem from '@/components/common/SongItem';
import { assets } from '@/assets/assets';
import NavBar from '@/components/layout/NavBar';

// selector: album by id
const selectAlbumById = (state: RootState, id?: string): Album | undefined =>
  id ? state.library.albumList.find(a => a.id === id) : undefined;

// selector factory: tracce per album (memoizzato)
const makeSelectTracksByAlbum = () =>
  createSelector(
    (state: RootState) => state.songs.list,
    (_: RootState, id?: string) => id,
    (list: Song[], id?: string) => (id ? list.filter(t => t.albumId === id) : [])
  );

const DisplayAlbum: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  // album (riferimento stabile)
  const album = useAppSelector((s) => selectAlbumById(s, id));

  // lista tracce (array memoizzato)
  const selectTracksByAlbum = useMemo(makeSelectTracksByAlbum, []);
  const tracks = useAppSelector((s) => selectTracksByAlbum(s, id));

  // mantieni selezione album nello store
  useEffect(() => { if (id) dispatch(selectAlbum(id)); }, [dispatch, id]);

  if (!id) return <Navigate to="/" replace />;
  if (!album) return null;

  return (
    <>
      <NavBar />

      <div className="mt-4">
        {/* header album con sfumatura verso il nero */}
        <header
          className="rounded-lg p-6 mb-6 flex items-center gap-5"
          style={{
            background: `linear-gradient(180deg, ${album.bgColor} 0%, rgba(18,18,18,0.6) 70%, #121212 100%)`
          }}
        >
          <img src={album.cover} className="w-36 h-36 rounded object-cover" />
          <div>
            <p className="uppercase text-sm font-semibold text-white/80">Album</p>
            <h2 className="text-5xl font-extrabold">{album.title}</h2>
            <p className="text-sm text-white/70 mt-1">{album.desc}</p>
          </div>
        </header>

        {/* intestazione colonne */}
        <div
          className="grid grid-cols-[32px_40px_1fr_160px_120px_48px]
                     gap-4 px-8 py-3 text-xs uppercase text-gray-400
                     border-b border-[#232323]"
        >
          <span className="text-right">#</span>
          <span></span>
          <span>Title</span>
          <span className="hidden sm:block">Album</span>
          <span className="hidden sm:block">Date added</span>
          <img className="w-4 justify-self-end opacity-70" src={assets.clock_icon} />
        </div>

        {/* lista tracce */}
        <section className="pb-32">
          {tracks.map((t, i) => (
            <SongItem key={t.id} track={t} index={i} />
          ))}
        </section>
      </div>
    </>
  );
};

export default DisplayAlbum;
