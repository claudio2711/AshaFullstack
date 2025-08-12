import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../App";

const ListSong = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchSongs = async () => {
    const { data } = await axios.get(`${url}/api/song/list`);
    setData(data?.tracce ?? []);
  };

  const removeSong = async (id: string) => {
    try {
      const { data } = await axios.delete(`${url}/api/song/remove/${id}`);
      if (data.success) {
        toast.success(data.message || "Traccia rimossa");
        await fetchSongs();
      } else toast.error(data.message || "Errore!");
    } catch {
      toast.error("Errore!");
    }
  };

  useEffect(() => { void fetchSongs(); }, []);

  // Template unico per header e righe
  const cols = "grid grid-cols-[80px_2fr_2fr_1fr_50px] items-center gap-4 px-4 py-3 border border-gray-300 text-sm mr-5";

  return (
    <div>
      <p>All songs List</p>
      <br />

      <div className={`${cols} bg-gray-100 font-semibold`}>
        <span>Image</span>
        <span>Name</span>
        <span>Album</span>
        <span className="text-center">Duration</span>
        <span className="text-center">Action</span>
      </div>

      {data.map((item) => (
        <div key={item._id} className={cols.replace(" bg-gray-100 font-semibold","")}>
          <img className="w-12 h-12 object-cover rounded" src={item.image} alt="" />
          <p>{item.name}</p>
          <p>{item.album}</p>
          <p className="text-center">{item.duration}</p>
          <p className="text-center cursor-pointer" onClick={() => removeSong(item._id)}>x</p>
        </div>
      ))}
    </div>
  );
};

export default ListSong;
