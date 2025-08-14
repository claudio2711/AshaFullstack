import { Router } from "express";
import upload from "../middleware/multer";
import {
  addAlbum,
  listAlbum,
  removeAlbum,
  updateAlbumColour,
} from "../controllers/albumController";

const albumRouter = Router();

albumRouter.post("/add", upload.single("image"), addAlbum);
albumRouter.get("/list", listAlbum);
albumRouter.delete("/remove/:id", removeAlbum);
albumRouter.patch("/colour/:id", updateAlbumColour);

export default albumRouter;

