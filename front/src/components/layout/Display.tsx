import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayHome  from '@/components/pages/DisplayHome';
import DisplayAlbum from '@/components/pages/DisplayAlbum';
import { useAppSelector } from '@/app/hooks';

/* Home: gradient fisso */
const HOME_GRADIENT =
  'linear-gradient(180deg,#060B23 0%,#0D1B3A 35%,#1A2149 55%,#462060 80%,#FF6F61 100%)';

const Display: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const albums = useAppSelector(s => s.library.albumList);

  useEffect(() => {
    const el = ref.current!;
    const match = pathname.match(/^\/album\/([^/]+)/);

    if (match) {
      const alb = albums.find(a => a.id === match[1]);
      const base = alb?.bgColor || '#121212';
      // sfuma verso il nero, mantenendo il “mood” dell’album
      el.style.background = `linear-gradient(180deg, ${base} 0%, rgba(18,18,18,0.6) 60%, #121212 100%)`;
    } else {
      el.style.background = HOME_GRADIENT;
    }
  }, [pathname, albums]);

  return (
    <div
      ref={ref}
      className="w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0"
      style={{ background: HOME_GRADIENT }}
    >
      <Routes>
        <Route path="/"          element={<DisplayHome />}  />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
