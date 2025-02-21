import PersonalInfoSchema from "./personal-info.schema";
import { type IPersonalInfo } from "./personal-info.dto";

export const getAllPersonalInfo = async () => {
  const result = await PersonalInfoSchema.find().lean();
  return result;
};

export const createPersonalInfo = async (data: IPersonalInfo) => {
  const result = await PersonalInfoSchema.create({ ...data });
  return result;
};

export const updatePersonalInfo = async (id: string, data: IPersonalInfo) => {
  const result = await PersonalInfoSchema.findByIdAndUpdate(
    id,
    { ...data },
    { new: true, runValidators: true }
  ).lean();
  if (!result) {
    throw new Error("Personal Info not found");
  }
  return result;
};

export const deletePersonalInfo = async (id: string) => {
  const result = await PersonalInfoSchema.findByIdAndDelete(id).lean();
  if (!result) {
    throw new Error("Personal Info not found");
  }
  return result;
};

export const getPersonalInfoById = async (id: string) => {
  const result = await PersonalInfoSchema.findById(id).lean();
  return result;
};
