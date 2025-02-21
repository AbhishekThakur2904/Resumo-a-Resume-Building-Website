import { model, Schema } from "mongoose";
import { IExperience } from "./experience.dto";

const ExperienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IExperience>("Experience", ExperienceSchema);
