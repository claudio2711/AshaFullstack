// src/models/songModel.ts
import { Schema, model, InferSchemaType } from "mongoose";

const songSchema = new Schema({
  name    : { type: String, required: true },
  desc    : { type: String, required: true },
  album   : { type: String, required: true },
  image   : { type: String, required: true },
  file    : { type: String, required: true },
  duration: { type: String, required: true }
});

// --> tipo derivato automaticamente dallo schema
export type SongDoc = InferSchemaType<typeof songSchema>;

export default model<SongDoc>("Song", songSchema);
