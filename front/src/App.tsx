// src/App.tsx
import React from 'react';
import Sidebar           from '@/components/layout/Sidebar';
import Display           from '@/components/layout/Display';
import Player            from '@/components/layout/Player';

const App: React.FC = () => (
 
    <div className="h-screen flex flex-col bg-[#000002]">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Display />
      </div>
      <Player />
    </div>
  
);

export default App;
