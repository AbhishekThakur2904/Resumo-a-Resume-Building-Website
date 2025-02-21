import { model, Schema } from "mongoose";
import { ICoverLetter } from "./coverletter.dto";

const CoverLetterSchema = new Schema<ICoverLetter>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    template: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<ICoverLetter>("CoverLetter", CoverLetterSchema);
