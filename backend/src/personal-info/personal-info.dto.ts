import { Types } from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";

export interface IPersonalInfo extends BaseSchema {
  resumeId: Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}
