// src/App.tsx
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { fetchAlbums } from '@/features/library/librarySlice';
import { fetchSongs }  from '@/features/songs/songsSlice';

import Sidebar from '@/components/layout/Sidebar';
import Display from '@/components/layout/Display';
import Player  from '@/components/layout/Player';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // carica tutto dal backend (usa VITE_API_BASE_URL o http://localhost:4000/api)
    dispatch(fetchAlbums());
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col bg-[#000002]">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Display />
      </div>
      <Player />
    </div>
  );
};

export default App;
