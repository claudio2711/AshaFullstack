/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/AddSong.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";             
import { assets } from "../assets/assets";
import { url } from "../App";


type NullableFile = File | null;

const AddSong = () => {
  const [image, setImage]     = useState<NullableFile>(null);
  const [song,  setSong]      = useState<NullableFile>(null);

  const [name,  setName]      = useState<string>("");
  const [desc,  setDesc]      = useState<string>("");
  const [album, setAlbum]     = useState<string>("none");

  const [loading, setLoading] = useState<boolean>(false);


  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!song || !image) {            // validazione rapida
      toast.error("Song file o cover mancanti");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name",   name);
      formData.append("desc",   desc);
      formData.append("album",  album);
      formData.append("audio",  song);
      formData.append("image",  image);

      const { data } = await axios.post(`${url}/api/song/add`, formData);

      if (data.success) {
        toast.success("Song aggiunta");
        // reset form
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(null);
        setSong(null);
      } else {
        toast.error(data.message ?? "Errore generico");
      }
    } catch (err) {
      toast.error("Errore di rete / server");
    } finally {
      setLoading(false);       
    }
  };


  if (loading) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      
      <div className="flex gap-8">
        
        <div className="flex flex-col gap-4">
          <p>Upload song</p>
          <input
            type="file"
            id="song"
            accept="audio/*"
            hidden
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSong(e.target.files?.[0] ?? null)
            }
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              className="w-24 h-24 cursor-pointer object-contain"
            />
          </label>
        </div>

        {}
        <div className="flex flex-col gap-4">
          <p>Upload image</p>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setImage(e.target.files?.[0] ?? null)
            }
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-24 h-24 cursor-pointer object-contain"
            />
          </label>
        </div>
      </div>

      {}
      <div className="flex flex-col gap-2.5">
        <p>Song name</p>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here"
          className="bg-transparent border-2 border-indigo-500 p-2.5 w-[min(400px,80vw)] outline-blue-900"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song description</p>
        <input
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Type here"
          className="bg-transparent border-2 border-indigo-500 p-2.5 w-[min(400px,80vw)] outline-blue-900"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="bg-transparent border-2 border-indigo-500 p-2.5 w-40 outline-blue-900"
        >
          <option value="none">none</option>
          {}
        </select>
      </div>

      <button
        type="submit"
        className="bg-black text-white py-2.5 px-14 text-base hover:bg-gray-800 transition"
      >
        ADD
      </button>
    </form>
  );
};

export default AddSong;
