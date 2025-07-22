/* eslint-disable @typescript-eslint/no-unused-vars */
 import { ToastContainer, toast } from "react-toastify";
 import { Routes, Route } from "react-router-dom";
import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import ListSong from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";
 

const DEFAULT_GRADIENT =
  'linear-gradient(180deg,' +
  '#060B23 0%,' +    // quasi-nero
  '#0D1B3A 35%,' +   // navy profondo (più spazio)
  '#1A2149 55%,' +   // blu-indaco
  '#462060 80%,' +   // viola/magenta scuro
  '#FF6F61 100%' +   // arancio rosato (solo parte finale)
  ')';


export const App = () => {
  return (
    <div className = "flex items-start min-h-screen">
      <ToastContainer/>
      <div className="flex-1 h-screen overflow-scroll bg-[#F3FFF7]">
         <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path = "/add-song" element={<AddSong/>}/>
            <Route path = "/add-album" element={<AddAlbum/>}/>
            <Route path = "/list-song" element={<ListSong/>}/>
            <Route path = "/list-album" element={<ListAlbum/>}/>
          </Routes>
         </div>
      </div>
    </div>
  )
}

export default App
