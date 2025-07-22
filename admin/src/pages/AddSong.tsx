import { assets } from "../assets/assets"

const AddSong = () => {
  return (
    <form className="flex flex-col items-start gap-8 text-gray-600">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
            <p>Upload song</p>
            <input type="file" id="song" accept="audio/*" hidden />
            <label htmlFor="song">
              <img src={assets.upload_song} className="2-24 cursor-pointer" alt=""  />
            </label>
        </div>
        <div className="flex flex-col gap-4">
          <p> Upload Image</p>
          <input type="file" id="image" accept="image/*" hidden />
          <label htmlFor="image">
              <img src={assets.upload_area} className="2-24 cursor-pointer" alt=""  />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 ">
          <p>Song Name</p>
          <input className="bg-transparent outline-blue-900 border-2 border-indigo-500 p-2.5 w-[max(40vw, 250px)]" placeholder="type here" type="text" required/>
      </div>

       <div className="flex flex-col gap-2.5 ">
          <p>Song Description</p>
          <input className="bg-transparent outline-blue-900 border-2 border-indigo-500 p-2.5 w-[max(40vw, 250px)]" placeholder="type here" type="text" required/>
      </div>

      <div className="flex flex-col gap-2.5 ">
          <p>Album</p>
          <select className="bg-transparent outline-blue-900 border-2 border-indigo-500 p-2.5 w-[150px]">
            <option value="none">none</option>
          </select>
      </div>

        <button type="submit" className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"> ADD</button>

    </form>
  )
}

export default AddSong
