import { BaseSchema } from "../common/dto/base.dto";

export interface IEducation extends BaseSchema {
    school: string;
    degree: string;
    startDate: Date;
    endDate: Date;
  }