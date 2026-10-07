import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt fields
  },
);

// Prevents model overwrite issues in development
const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
