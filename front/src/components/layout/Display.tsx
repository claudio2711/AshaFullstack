import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayHome  from '@/components/pages/DisplayHome';
import DisplayAlbum from '@/components/pages/DisplayAlbum';
import albums       from '@/data/albums.json';
import type { Album } from '@/types/music';

/* ───── Gradient “crepuscolo”: blu-nero → arancio rosato ───── */
const DEFAULT_GRADIENT =
  'linear-gradient(180deg,' +
  '#060B23 0%,' +    // quasi-nero
  '#0D1B3A 35%,' +   // navy profondo (più spazio)
  '#1A2149 55%,' +   // blu-indaco
  '#462060 80%,' +   // viola/magenta scuro
  '#FF6F61 100%' +   // arancio rosato (solo parte finale)
  ')';

const Display: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const el = ref.current!;
    const match = pathname.match(/^\/album\/(.+)/);
    if (match) {
      const alb = (albums as Album[]).find(a => a.id === match[1]);
      el.style.background = alb
        ? `linear-gradient(to bottom, ${alb.bgColor} 0%, #121212 80%)`
        : DEFAULT_GRADIENT;
    } else {
      el.style.background = DEFAULT_GRADIENT;
    }
  }, [pathname]);

  return (
    <div
      ref={ref}
      className="w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0"
      style={{ background: DEFAULT_GRADIENT }}
    >
      <Routes>
        <Route path="/"          element={<DisplayHome />}  />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
