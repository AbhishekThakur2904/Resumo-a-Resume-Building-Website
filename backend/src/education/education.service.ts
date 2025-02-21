import { IEducation } from "./education.dto";
import EducationSchema from "./education.schema";

/**
 * Creates a new education entry in the database.
 * @param data The data for the education entry, in the format of IEducation.
 * @returns The newly created education entry.
 */
export const createEducation = async (data: IEducation[]) => {
  const result = await EducationSchema.insertMany(data);
  return result;
};


/**
 * Retrieves all education entries from the database.
 * @returns A promise that resolves to an array of all education entries in the database.
 */
export const getAllEducation = async () => {
  const result = await EducationSchema.find().lean();
  return result;
};


/**
 * Retrieves an education entry by its ID from the database.
 * @param id - The unique identifier of the education entry to retrieve.
 * @returns A promise that resolves to the education entry if found, or null if not found.
 */

export const getEducationById = async (id: string) => {
  const result = await EducationSchema.findById(id).lean();
  return result;
};

/**
 * Deletes an education entry by its ID from the database.
 * @param id - The unique identifier of the education entry to delete.
 * @returns A promise that resolves to the deleted education entry if found and deleted.
 * @throws {Error} If the education entry is not found.
 */

export const deleteEducation = async (id: string) => {
  const result = await EducationSchema.findByIdAndDelete(id).lean();
  if (!result) {
    throw new Error("Education not found");
  }
  return result;
};

/**
 * Updates an existing education entry in the database.
 * @param id - The unique identifier of the education entry to update.
 * @param data - The updated data for the education entry, in the format of IEducation.
 * @returns A promise that resolves to the updated education entry if found and updated.
 * @throws {Error} If the education entry is not found.
 */
export const updateEducation = async (id: string, data: IEducation) => {
  const result = await EducationSchema.findByIdAndUpdate(id, { ...data }, { new: true, runValidators: true }).lean();
  if (!result) {
    throw new Error("Education not found");
  }
  return result;
};
