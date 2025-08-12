
import { Schema, model, InferSchemaType } from "mongoose";

const songSchema = new Schema({
  name    : { type: String, required: true },
  desc    : { type: String, required: true },
  album   : { type: String, required: true },
  image   : { type: String, required: true },
  file    : { type: String, required: true },
  duration: { type: String, required: true },
  imagePublicId: { type: String, default: null },   // <—
  audioPublicId: { type: String, default: null }
});


export type SongDoc = InferSchemaType<typeof songSchema>;

export default model<SongDoc>("Song", songSchema);
