import { model, Schema } from "mongoose";
import { IResume } from "./resume.dto";

const ResumeSchema = new Schema<IResume>(
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

    template: {
      type: String,
    },
    personalInfo: {
      type: Schema.Types.ObjectId,
      ref: "PersonalInfo",
    },
    education: [
      {
        type: Schema.Types.ObjectId,
        ref: "Education",
      },
    ],
    experience: [
      {
        type: Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
    skills: [String],
  },
  { timestamps: true }
);
export default model<IResume>("Resume", ResumeSchema);
