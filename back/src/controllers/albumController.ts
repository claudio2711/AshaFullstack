import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import AlbumModel, { AlbumDoc } from "../models/albumModel";

interface AddAlbumBody {
  name: string;
  desc: string;
  bgColour: string;
}

// util: slug pulito per public_id di Cloudinary
const albumSlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 _-]/g, "") // rimuove caratteri non validi
    .replace(/\s+/g, "_");

export const addAlbum = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  try {
    const { name, desc, bgColour } = req.body as AddAlbumBody;
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
      public_id: `albums/${albumSlug(name)}`,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      invalidate: true,
    });

    const album = await AlbumModel.create({
      name,
      desc,
      bgColour,
      image: imageUp.secure_url,
      imagePublicId: imageUp.public_id,
    });

    return res.json({ success: true, message: "album creato", data: album });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: (err as Error).message });
  }
};

export const listAlbum = async (_req: Request, res: Response) => {
  const albums = await AlbumModel.find().lean();
  return res.json({ success: true, albums });
};

export const removeAlbum = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const album = await AlbumModel.findById(id);
    if (!album) {
      return res
        .status(404)
        .json({ success: false, message: "album non trovato" });
    }

    if ((album as any).imagePublicId) {
      await cloudinary.uploader.destroy((album as any).imagePublicId);
    }

    await album.deleteOne();
    return res.json({ success: true, message: "album rimosso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const updateAlbumColour = async (
  req: Request<{ id: string }, unknown, { bgColour: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { bgColour } = req.body;

    const updated = await AlbumModel.findByIdAndUpdate(
      id,
      { bgColour },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "album non trovato" });
    }

    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

