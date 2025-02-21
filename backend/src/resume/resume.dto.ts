import { Types } from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";
import { IUser } from "../users/user.dto";
import { IPersonalInfo } from "../personal-info/personal-info.dto";
import { IEducation } from "../education/education.dto";
import { IExperience } from "../experience/experience.dto";

export interface IResume extends BaseSchema {
  userId: IUser | Types.ObjectId;
  title: string;
  personalInfo: IPersonalInfo;
  education: IEducation[];
  experience: IExperience[];
  skills: string[];
  template?: string;
}
