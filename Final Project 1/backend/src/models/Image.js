import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    prompt: { type: String, required: true },
    imageUrl: { type: String },    // for hosted images
    imageBase64: { type: String }, // for local/base64 images
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model("Image", imageSchema);
