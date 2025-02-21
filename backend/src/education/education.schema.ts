import { model, Schema } from "mongoose";
import { IEducation } from "./education.dto";
const EducationSchema = new Schema<IEducation>(
  {
    school: {
      type: String,
    },
    degree: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default model<IEducation>("Education", EducationSchema);
