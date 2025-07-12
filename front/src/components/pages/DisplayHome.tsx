// src/components/pages/DisplayHome.tsx
import NavBar     from '@/components/layout/NavBar';
import AlbumItem  from '@/components/common/AlbumItem';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { play, setTrack } from '@/features/player/playerSlice';
import { useNavigate } from 'react-router-dom';

const DisplayHome: React.FC = () => {
  const dispatch = useAppDispatch();

  /* dati globali */
  const albums = useAppSelector(s => s.library.albumList);     // :contentReference[oaicite:0]{index=0}
  const songs  = useAppSelector(s => s.songs.list);            // :contentReference[oaicite:1]{index=1}
  const navigate = useNavigate();

  return (
    <>
      <NavBar />

      <section className="py-8 px-6 text-white space-y-12">
        {/* Featured Charts */}
        <div>
          <h1 className="text-3xl font-bold mb-6">Featured Charts</h1>
          <div className="flex gap-6 overflow-x-auto">
            {albums.slice(0, 8).map(alb => (
              <AlbumItem key={alb.id} album={alb} />
            ))}
          </div>
        </div>

        {/* Tracce */}
        <div>
          <h1 className="text-3xl font-bold mb-6">Tracce</h1>
          <div className="flex gap-6 overflow-x-auto">
            {songs.slice(0, 12).map(trk => (
              <article
                key={trk.id}
                  onClick={() => {
                  dispatch(setTrack(trk.id));   // start track
                  dispatch(play());
                  navigate(`/album/${trk.albumId}`); // open album page
                }}
                className="flex-shrink-0 w-[180px] p-2 px-3 rounded cursor-pointer
                           hover:bg-white/10 select-none"
              >
                <img src={trk.cover} alt={trk.title}
                     className="w-full h-40 object-cover rounded-lg" />
                <h3 className="font-semibold mt-3 truncate">{trk.title}</h3>
                <p  className="text-sm text-gray-400 truncate">{trk.artist}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DisplayHome;
