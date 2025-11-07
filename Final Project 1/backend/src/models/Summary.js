import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
    summaryText: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model('Summary', summarySchema);
