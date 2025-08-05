import { Request, Response } from "express";
import { v2 as cloudinary }  from "cloudinary";
import AlbumModel, { AlbumDoc } from "../models/albumModel";


interface AddAlbumBody {
  name    : string;
  desc    : string;
  bgColour: string;
}


interface MulterFiles {
  image?: Express.Multer.File[];
}


export const addAlbum = async (
  req: Request & { file?: Express.Multer.File }, 
  res: Response
) => {
  try {
    const { name, desc, bgColour } = req.body;
    const imageFile = req.file;

    
    if (!imageFile) {
      return res.status(400).json({ success: false, message: "cover mancante" });
    }

    
    const already = await AlbumModel.findOne<AlbumDoc>({ name }).lean();
    if (already) {
      return res.status(409).json({ success: false, message: "album esistente" });
    }

   
    const imageUp = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      public_id    : `albums/${name.replace(/\s+/g, "_").toLowerCase()}`
    });

  
    const album = await AlbumModel.create({
      name,
      desc,
      bgColour,
      image: imageUp.secure_url
    });

    return res.json({ success: true, message: "album creato", data: album });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: (err as Error).message });
  }
};


export const listAlbum = async (_req: Request, res: Response) => {
  const albums = await AlbumModel.find().lean();
  return res.json({ success: true, albums });
};

export const removeAlbum = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await AlbumModel.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ success:false, message:"album non trovato" });
    }
    return res.json({ success:true, message:"album rimosso" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:"server error" });
  }
};

