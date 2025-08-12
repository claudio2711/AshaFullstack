import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../App";

const ListAlbum = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchAlbums = async () => {
    const { data } = await axios.get(`${url}/api/album/list`);
    setData(data?.albums ?? []);
  };

  const removeAlbum = async (id: string) => {
    try {
      const { data } = await axios.delete(`${url}/api/album/remove/${id}`);
      if (data.success) {
        toast.success(data.message || "Album rimosso");
        await fetchAlbums();
      } else toast.error(data.message || "Errore!");
    } catch {
      toast.error("Errore!");
    }
  };

  const updateColour = async (id: string, newColour: string) => {
    // update ottimistico
    const prev = [...data];
    setData((arr) => arr.map(a => a._id === id ? { ...a, bgColour: newColour } : a));

    try {
      const { data: resp } = await axios.patch(`${url}/api/album/colour/${id}`, { bgColour: newColour });
      if (!resp?.success) throw new Error(resp?.message || "Errore");
    } catch (e) {
      setData(prev);
      toast.error("Impossibile aggiornare il colore");
    }
  };

  useEffect(() => { void fetchAlbums(); }, []);

  // stesso template usato in ListSong
  const cols =
    "grid grid-cols-[80px_2fr_2fr_1fr_50px] items-center gap-4 px-4 py-3 border border-gray-300 text-sm mr-5";

  return (
    <div>
      <p>All Albums List</p>
      <br />

      <div className={`${cols} bg-gray-100 font-semibold`}>
        <span>Image</span>
        <span>Name</span>
        <span>Description</span>
        <span className="text-center">Album Colour</span>
        <span className="text-center">Action</span>
      </div>

      {data.map((item) => (
        <div key={item._id} className={cols}>
          <img className="w-12 h-12 object-cover rounded" src={item.image} alt="" />
          <p>{item.name}</p>
          <p>{item.desc}</p>

          <div className="flex justify-center">
            <input
              type="color"
              value={item.bgColour}
              onChange={(e) => updateColour(item._id, e.target.value)}
              className="h-6 w-10 p-0 border border-gray-300 rounded cursor-pointer"
              title={item.bgColour}
            />
          </div>

          <p
            className="text-center cursor-pointer"
            onClick={() => removeAlbum(item._id)}
          >
            x
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListAlbum;

