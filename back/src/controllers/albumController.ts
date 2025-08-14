import type { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import AlbumModel from "../models/albumModel";

// util per avere public_id leggibile
const albumSlug = (name: string) =>
  name.trim().toLowerCase().replace(/[^a-z0-9 _-]/g, "").replace(/\s+/g, "_");

// POST /api/album/add
export const addAlbum = async (req: Request, res: Response) => {
  try {
    const { name, desc, bgColour } = req.body as {
      name?: string; desc?: string; bgColour?: string;
    };
    const file = (req.file as Express.Multer.File | undefined);

    if (!name || !desc || !bgColour || !file) {
      return res.status(400).json({ success: false, message: "campi o file mancanti" });
    }

    const up = await cloudinary.uploader.upload(file.path, {
      folder: "covers",
      public_id: `albums/${albumSlug(name)}`,
      resource_type: "image",
      overwrite: true,
    });

    const doc = await AlbumModel.create({
      name, desc, bgColour,
      image: up.secure_url,
      imagePublicId: up.public_id,
    });

    return res.json({ success: true, data: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// GET /api/album/list
export const listAlbum = async (_req: Request, res: Response) => {
  try {
    const albums = await AlbumModel.find({}).sort({ createdAt: -1, _id: -1 }).lean().exec();
    return res.json({ success: true, albums });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// DELETE /api/album/remove/:id
export const removeAlbum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const album = await AlbumModel.findById(id);
    if (!album) return res.status(404).json({ success: false, message: "album non trovato" });

    if ((album as any).imagePublicId) {
      await cloudinary.uploader.destroy((album as any).imagePublicId);
    }
    await album.deleteOne();

    return res.json({ success: true, message: "album removed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// PATCH /api/album/colour/:id
export const updateAlbumColour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { bgColour } = req.body as { bgColour?: string };
    if (!bgColour) return res.status(400).json({ success: false, message: "bgColour mancante" });

    const updated = await AlbumModel.findByIdAndUpdate(
      id,
      { $set: { bgColour } },
      { new: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ success: false, message: "album non trovato" });
    }
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};


