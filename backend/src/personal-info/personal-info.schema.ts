import { model, Schema } from "mongoose";
import { IPersonalInfo } from "./personal-info.dto";

const PersonalInfoSchema = new Schema<IPersonalInfo>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
    },
  },
  { timestamps: true }
);

export default model<IPersonalInfo>("PersonalInfo", PersonalInfoSchema);
