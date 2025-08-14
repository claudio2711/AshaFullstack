// admin/src/pages/ListSong.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../App";

/* ---------- Tipi delle API ---------- */
interface SongApi {
  _id: string;
  name: string;
  album: string;   // id dell’album
  image: string;
  duration: string;
  createdAt?: string;
}
interface SongListRes {
  success: boolean;
  tracce: SongApi[];
}

interface AlbumApi { _id: string; name: string }
interface AlbumListRes {
  success: boolean;
  albums: AlbumApi[];
}

interface RemoveRes { success: boolean; message?: string }

/* ---------- Componente ---------- */
const ListSong = () => {
  const [songs, setSongs] = useState<SongApi[]>([]);
  const [albumById, setAlbumById] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchAll = async () => {
      const [sRes, aRes] = await Promise.all([
        axios.get<SongListRes>(`${url}/api/song/list`),
        axios.get<AlbumListRes>(`${url}/api/album/list`),
      ]);

      setSongs(sRes.data?.tracce ?? []);

      const albums = aRes.data?.albums ?? [];
      const map: Record<string, string> = Object.fromEntries(
        albums.map((a: AlbumApi) => [a._id, a.name])
      );
      setAlbumById(map);
    };

    void fetchAll();
  }, []);

  const removeSong = async (id: string) => {
    try {
      const { data } = await axios.delete<RemoveRes>(`${url}/api/song/remove/${id}`);
      if (data.success) {
        toast.success(data.message ?? "Traccia rimossa");
        setSongs(prev => prev.filter(s => s._id !== id)); // aggiorna localmente, niente refetch
      } else {
        toast.error(data.message ?? "Errore!");
      }
    } catch {
      toast.error("Errore!");
    }
  };

  const row =
    "grid grid-cols-[80px_2fr_2fr_1fr_50px] items-center gap-4 px-4 py-3 border border-gray-300 text-sm mr-5";

  return (
    <div>
      <p>All songs List</p>
      <br />

      <div className={`${row} bg-gray-100 font-semibold`}>
        <span>Image</span>
        <span>Name</span>
        <span>Album</span>
        <span className="text-center">Duration</span>
        <span className="text-center">Action</span>
      </div>

      {songs.map((item) => (
        <div key={item._id} className={row}>
          <img className="w-12 h-12 object-cover rounded" src={item.image} alt="" />
          <p>{item.name}</p>
          <p>{albumById[item.album] ?? item.album}</p>
          <p className="text-center">{item.duration}</p>
          <button
            className="text-center cursor-pointer text-red-600"
            onClick={() => removeSong(item._id)}
            aria-label="Remove song"
            title="Remove song"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListSong;

