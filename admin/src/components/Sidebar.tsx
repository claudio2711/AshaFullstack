import {assets} from "../assets/assets.ts"  
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="min-h-screen w-[220px] sm:w-[260px] px-4"
    style={{ background: "linear-gradient(180deg, #2D3872 0%, #000 100%)" }}>
        <img src={assets.logo} className="hidden sm:block mt-5 w-32" alt="" />
        <img src={assets.logo_small} className="block sm:hidden mt-5 w-10" alt="" />

        <div className="flex flex-col gap-5 mt-10">

            
          <NavLink to = "/add-song" className="flex items-center gap-2.5 text-gray-800 bg-white border border-back p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#FF6F5B] text-sm font-medium">
                <img src={assets.add_song} className="w-5" alt="" />
                <p className="hidden sm:block">Add Song</p>
          </NavLink>   

          <NavLink to = "/list-song" className="flex items-center gap-2.5 text-gray-800 bg-white border border-back p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#303C73] text-sm font-medium">
                <img src={assets.song_icon} className="w-5" alt="" />
                <p className="hidden sm:block">List Song</p>
          </NavLink>   

          <NavLink to = "/add-album" className="flex items-center gap-2.5 text-gray-800 bg-white border border-back p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#FF6F5B] text-sm font-medium">
                <img src={assets.add_album} className="w-5" alt="" />
                <p className="hidden sm:block">Add Album</p>
          </NavLink>   

          <NavLink to = "/list-album" className="flex items-center gap-2.5 text-gray-800 bg-white border border-back p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#303C73] text-sm font-medium">
                <img src={assets.album_icon} className="w-5" alt="" />
                <p className="hidden sm:block">List Album</p>
          </NavLink>   

        </div>
    </div>
  )
}

export default Sidebar
