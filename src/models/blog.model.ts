import mongoose, { Schema, Document, Model } from "mongoose";

const collection =
  process.env.NEXT_PUBLIC_LANG == "en" ? "blogs" : "translated_blog";

interface IBlog extends Document {
  title: string;
  date: string;
  type: string;
  body: string;
}

const blogSchema: Schema = new Schema(
  { 
    title: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    body: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, collection: collection }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
