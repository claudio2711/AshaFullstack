// src/controllers/songController.ts
// ----------------------------------------------------------------------
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import SongModel from "../models/songModel";


interface AddSongBody {
  name: string;
  desc: string;
  album: string; 
}

interface MulterFiles {
  image?: Express.Multer.File[];
  audio?: Express.Multer.File[];
}


const formatDuration = (totalSeconds: number): string => {
  const s = Math.max(0, Math.round(totalSeconds || 0));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
};

// POST /api/song/add
export const addSong = async (req: Request<{}, {}, AddSongBody>, res: Response) => {
  try {
    const { name, desc, album } = req.body || {};
    const files = req.files as MulterFiles;

    if (!name || !desc || !album) {
      return res.status(400).json({ success: false, message: "campi obbligatori mancanti" });
    }
    if (!files?.image?.[0] || !files?.audio?.[0]) {
      return res.status(400).json({ success: false, message: "file mancanti (image, audio)" });
    }

    
    const imgUp = await cloudinary.uploader.upload(files.image[0].path, {
      folder: "covers",
    });

    
    const audioUp = await cloudinary.uploader.upload(files.audio[0].path, {
      folder: "songs",
      resource_type: "video",
    });

    
    const duration = formatDuration(Number(audioUp.duration || 0));

    
    const songDoc = await SongModel.create({
      name,
      desc,
      album,
      image: imgUp.secure_url,
      file: audioUp.secure_url,
      duration,
      imagePublicId: imgUp.public_id,   
      audioPublicId: audioUp.public_id,
    });

    return res.json({
      success: true,
      message: "traccia aggiunta",
      traccia: songDoc,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// GET /api/song/list
export const listSong = async (_req: Request, res: Response) => {
  try {
    const songs = await SongModel.find({}).lean();
    return res.json({ success: true, tracce: songs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// DELETE /api/song/remove/:id
export const removeSong = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const song = await SongModel.findById(id);
    if (!song) {
      return res.status(404).json({ success: false, message: "brano non trovato" });
    }

    
    if ((song as any).imagePublicId) {
      await cloudinary.uploader.destroy((song as any).imagePublicId);
    }
    if ((song as any).audioPublicId) {
      await cloudinary.uploader.destroy((song as any).audioPublicId, { resource_type: "video" });
    }

    await song.deleteOne();
    return res.json({ success: true, message: "track removed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
