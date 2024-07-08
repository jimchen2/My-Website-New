import mongoose, { Schema, Model, Document as MongooseDocument } from "mongoose";

const collection = "documents";

interface IDocument extends MongooseDocument {
  title: string;
  date: Date;
  type: string;
  access: 1 | 2 | 3;
  body: string;
}

const DocumentSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this document."],
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    type: {
      type: String,
      default: "",
      required: true,
    },
    access: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
      default: 2,
    },
    body: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, collection: collection }
);

const Document: Model<IDocument> = mongoose.models.Document || mongoose.model<IDocument>("Document", DocumentSchema);

export default Document;
