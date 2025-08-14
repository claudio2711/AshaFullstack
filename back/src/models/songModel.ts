import { Schema, model, InferSchemaType } from "mongoose";

const songSchema = new Schema(
  {
    name:           { type: String, required: true },
    desc:           { type: String, required: true },
    album:          { type: String, required: true }, // può essere id o nome, come già fai
    image:          { type: String, required: true },
    file:           { type: String, required: true },
    duration:       { type: String, required: true }, // es. "3:32"
    imagePublicId:  { type: String, default: null },
    audioPublicId:  { type: String, default: null },
  },
  { timestamps: true } // <-- createdAt/updatedAt
);

export type SongDoc = InferSchemaType<typeof songSchema>;
export default model<SongDoc>("Song", songSchema);

