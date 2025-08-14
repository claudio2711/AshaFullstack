// src/controllers/songController.ts
import type { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import SongModel from "../models/songModel";

// util
const toMMSS = (sec: number | undefined) => {
  const s = Math.max(0, Math.floor(sec ?? 0));
  const m = Math.floor(s / 60);
  const r = (s % 60).toString().padStart(2, "0");
  return `${m}:${r}`;
};

// POST /api/song/add
export const addSong = async (req: Request, res: Response) => {
  try {
    const { name, desc, album } = req.body as {
      name?: string; desc?: string; album?: string;
    };

    const files = req.files as {
      image?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    };

    if (!name || !desc || !album) {
      return res.status(400).json({ success: false, message: "campi mancanti" });
    }
    if (!files?.image?.[0] || !files?.audio?.[0]) {
      return res.status(400).json({ success: false, message: "file mancanti" });
    }

    // upload cover
    const upImg = await cloudinary.uploader.upload(files.image[0].path, {
      folder: "covers",
      resource_type: "image",
    });

    // upload audio (Cloudinary gestisce audio come 'video')
    const upAud = await cloudinary.uploader.upload(files.audio[0].path, {
      folder: "songs",
      resource_type: "video",
    });

    const doc = await SongModel.create({
      name,
      desc,
      album,
      image: upImg.secure_url,
      file:  upAud.secure_url,
      duration: toMMSS(upAud.duration as number | undefined),
      imagePublicId: upImg.public_id,
      audioPublicId: upAud.public_id,
    });

    return res.json({ success: true, data: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// GET /api/song/list
export const listSong = async (_req: Request, res: Response) => {
  try {
    const docs = await SongModel.find({})
      .sort({ createdAt: -1, _id: -1 })
      .lean()
      .exec();

    // garantisci sempre createdAt (ISO) anche per record vecchi senza timestamps
    const tracce = docs.map((d: any) => {
      const cAt: Date | undefined = d.createdAt
        ? new Date(d.createdAt)
        : (typeof d._id?.getTimestamp === "function" ? d._id.getTimestamp() : undefined);
      return { ...d, createdAt: cAt ? cAt.toISOString() : undefined };
    });

    return res.json({ success: true, tracce });
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
      return res.status(404).json({ success: false, message: "song non trovata" });
    }

    // rimuovi media su Cloudinary se presenti
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
