

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subTitle: {
      type: String,
      trim: true,
    },

   
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["technology", "startup", "lifestyle", "all", "finance"],
    },

    image: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
    
    Liked: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
    Disliked: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ]
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;