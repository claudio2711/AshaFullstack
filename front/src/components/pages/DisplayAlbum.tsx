// src/components/pages/DisplayAlbum.tsx
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectAlbum } from '@/features/library/librarySlice';
import SongItem from '@/components/common/SongItem';
import { assets } from '@/assets/assets';
import NavBar from '@/components/layout/NavBar';

const DisplayAlbum: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  /* seleziona album a mount / cambio id */
  useEffect(() => {
    if (id) dispatch(selectAlbum(id));
  }, [dispatch, id]);

  const album  = useAppSelector(s =>
    s.library.albumList.find(a => a.id === id)
  );
  const tracks = useAppSelector(s =>
    s.songs.list.filter(t => t.albumId === id)
  );

  /* 404 fallback */
  if (!album) return <Navigate to="/" />;

  return (
    <>
      <NavBar />

      <div className="flex-1 overflow-y-auto">
        {/* header album */}
        <header
          className="h-[260px] w-full flex items-end gap-6
                     px-8 py-6"
          style={{ background: album.bgColor }}
        >
          <img
            src={album.cover}
            alt={album.title}
            className="w-48 h-48 object-cover shadow-xl rounded"
          />

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold">ALBUM</span>
            <h1 className="text-5xl font-extrabold">{album.title}</h1>
            <p className="text-sm text-gray-300"></p>
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
          <span className="hidden md:block">Date Added</span>
          <img src={assets.clock_icon} alt="length" className="m-auto w-4" />
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
