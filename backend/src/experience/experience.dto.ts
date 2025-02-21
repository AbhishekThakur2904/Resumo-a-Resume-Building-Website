import { BaseSchema } from "../common/dto/base.dto";

export interface IExperience extends BaseSchema {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
}
