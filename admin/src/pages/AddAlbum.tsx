import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";             
import { assets } from "../assets/assets";
import { url } from "../App";

type NullableFile = File | null;

const AddAlbum = () => {
  const [image, setImage]   = useState<NullableFile>(null);
  const [bgColour, setColour] = useState("#ffffff");
  const [name, setName]     = useState("");
  const [desc, setDesc]     = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!image) 
      {      
        toast.error(" cover mancante");
        return;
      }

      setLoading(true);

      try {
        const formData = new FormData();

        
        formData.append("desc", desc);
        formData.append("image", image);
        formData.append("name", name);
        formData.append("bgColour", bgColour);

        const respone = await axios.post(`${url}/api/album/add`, formData);

        if(respone)
          {
            toast.success("album aggiunto");
            setDesc("");
            setName("");
            setImage(null);

          }
          else 
            {
              toast.error("qualcosa è andato storto");
            }

      } catch (err: any) {
  toast.error(err?.response?.data?.message || "errore!");
        
      }

      setLoading(false);
    }

  
  return loading? (
    <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin" />
      </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
      <div>
        <p>Upload Image</p>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setImage(e.target.files?.[0] ?? null)
          }
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            className="w-24 cursor-pointer"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album name</p>
        <input
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="scrivi qui"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album description</p>
        <input
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="scrivi qui"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <p>Bg colour</p>
        <input
          type="color"
          value={bgColour}
          onChange={(e) => setColour(e.target.value)}
        />
      </div>

      <button className="text-base bg-black text-white py-2.5 px-14 cursor-pointer" type="submit">
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
