import ExperienceSchema from "./experience.schema";
import { IExperience } from "./experience.dto";
/**
 * @function getAllExperience
 * @description Retrieves all experience records.
 * @returns {Promise<IExperience[]>} An array of experience records.
 */
export const getAllExperience = async () => {
    const result = await ExperienceSchema.find().lean();
    return result;
}

/**
 * @function createExperience
 * @description Creates new experience records.
 * @param {IExperience[]} data - An array of experience records.
 * @returns {Promise<IExperience[]>} The created experience records.
 */
export const createExperience = async (data: IExperience[]) => {
    const result = await ExperienceSchema.insertMany(data);
    return result;
}

/**
 * @function updateExperience
 * @description Updates an existing experience record.
 * @param {string} id - The ID of the experience record to update.
 * @param {IExperience} data - The updated experience record.
 * @returns {Promise<IExperience>} The updated experience record.
 */
export const updateExperience = async (id: string, data: IExperience) => {
    const result = await ExperienceSchema.findByIdAndUpdate(id, { ...data }, { new: true, runValidators: true }).lean();
    if (!result) {
        throw new Error("Experience not found");
    }
    return result;
}   

/**
 * @function deleteExperience
 * @description Deletes an existing experience record.
 * @param {string} id - The ID of the experience record to delete.
 * @returns {Promise<IExperience>} The deleted experience record.
 */
export const deleteExperience = async (id: string) => {
    const result = await ExperienceSchema.findByIdAndDelete(id).lean();
    if (!result) {
        throw new Error("Experience not found");
    }
    return result;
}   

/**
 * @function getExperienceById
 * @description Retrieves an existing experience record by ID.
 * @param {string} id - The ID of the experience record to retrieve.
 * @returns {Promise<IExperience>} The retrieved experience record.
 */
export const getExperienceById = async (id: string) => {
  const result = await ExperienceSchema.findById(id).lean();
  return result;
};
