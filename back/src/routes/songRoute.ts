// routes/songRoute.ts  – correzione

import { addSong, listSong, removeSong } from "../controllers/songController";
import express from "express";
import upload from "../middleware/multer";

const songRouter = express.Router();

/* usa il metodo .fields dell’istanza Multer -------------------- */
songRouter.post("/add",upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 }  
  ]),
  addSong
);

songRouter.get("/list", listSong);
songRouter.delete("/remove/:id", removeSong);

export default songRouter;
