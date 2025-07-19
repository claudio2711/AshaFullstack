// src/controllers/songController.ts
// ----------------------------------------------------------------------
import { Request, Response } from "express";
import { v2 as cloudinary }  from "cloudinary";
import SongModel, { SongDoc } from "../models/songModel";
import songModel from "../models/songModel";


interface AddSongBody 
{
  name : string;
  desc : string;
  album: string;
}

interface MulterFiles 
{
  audio?: Express.Multer.File[]; 
  image?: Express.Multer.File[];   
}

export const addSong = async (
  req: Request<unknown, unknown, AddSongBody> & { files?: MulterFiles },
  res: Response
) => {
  try 
  {

    const { name, desc, album } = req.body;

    const files     = req.files ?? {};
    const audioFile = files.audio?.[0];
    const imageFile = files.image?.[0];

    if (!audioFile) 
    {
      return res.status(400).json({ success: false, message: "audio mancante" });
    }

    let imageUrl: string;

    const previous = await SongModel.findOne<SongDoc>({ album }).lean();
    if (previous?.image) 
    {
      imageUrl = previous.image;                  
    } else {
      if (!imageFile) 
      {
        return res.status(400).json({ success:false, message:"image mancante" });
      }
      const imageUp = await cloudinary.uploader.upload(imageFile.path, 
      {
        resource_type: "image",
        public_id    : `albums/${album.replace(/\s+/g, "_").toLowerCase()}`
      });
      imageUrl = imageUp.secure_url;
    }

 
    const audioUp = await cloudinary.uploader.upload(audioFile.path, 
    {
      resource_type: "video"                      
    });

   
    const duration = `${Math.floor(audioUp.duration / 60)}:${
      Math.floor(audioUp.duration % 60).toString().padStart(2, "0")
    }`;

   //MongoDB
    const songDoc = await SongModel.create({
      name,
      desc,
      album,
      image: imageUrl,            
      file : audioUp.secure_url,  
      duration
    });


    return res.json({
      success : true,
      message : "traccia aggiunta",
      data    : songDoc
    });

  } catch (err) 
  {
    console.error(err);
    return res.status(500).json({
      success : false,
      message : (err as Error).message
    });
  }
};


export const listSong = async (_req: Request, res: Response) => {
  try 
  {
    const songs = await SongModel.find().lean();
    return res.json({ success: true, tracce: songs });
    
  } catch (error) 
  {
    res.json({success: false});
  }
  
};


export const removeSong = async (
  req: Request<{ id: string }>,            // 🎯 id arriva da req.params
  res: Response
) => {
  try 
  {
    const { id } = req.params;             // ← adesso c’è sempre

    const deleted = await songModel.findByIdAndDelete(id);
    if (!deleted) 
    {
      return res
        .status(404)
        .json({ success: false, message: "brano non trovato" });
    }
    return res.json({ success: true, message: "track removed" });
  } catch (err) 
  {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
