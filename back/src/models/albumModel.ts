import { Schema, model, InferSchemaType } from "mongoose";


const albumSchema = new Schema({
  name    : { type: String, required: true },
  desc    : { type: String, required: true },
  bgColour: { type: String, required: true },
  image   : { type: String, required: true }
});

export type AlbumDoc = InferSchemaType<typeof albumSchema>;

export default model<AlbumDoc>("Album", albumSchema);
