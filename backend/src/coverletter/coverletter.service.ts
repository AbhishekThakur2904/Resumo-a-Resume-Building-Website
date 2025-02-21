import CoverLetterSchema from "./coverletter.schema";
import { ICoverLetter } from "./coverletter.dto";
/**
 * Retrieves all cover letters
 * @returns {Promise<ICoverLetter[]>} Array of cover letters
 */
export const getAllCoverLetter = async () => {
  const result = await CoverLetterSchema.find().lean();
  return result;
};

/**
 * Retrieves a specific cover letter by id
 * @param {string} id - The id of the cover letter
 * @returns {Promise<ICoverLetter | null>} The cover letter with the specified id
 */
export const getCoverLetterById = async (id: string) => {
  const result = await CoverLetterSchema.findById(id).lean();
  return result;
};

/**
 * Creates a new cover letter
 * @param {ICoverLetter} data - The data of the cover letter to create
 * @returns {Promise<ICoverLetter>} The newly created cover letter
 */
export const createCoverLetter = async (data: ICoverLetter) => {
  const result = await CoverLetterSchema.create({ ...data });
  return result;
};

/**
 * Updates a specific cover letter
 * @param {string} id - The id of the cover letter to update
 * @param {ICoverLetter} data - The data of the cover letter to update
 * @returns {Promise<ICoverLetter | null>} The updated cover letter
 */
export const updateCoverLetter = async (id: string, data: ICoverLetter) => {
  const result = await CoverLetterSchema.findByIdAndUpdate(
    id,
    { ...data },
    { new: true, runValidators: true }
  ).lean();
  if (!result) {
    throw new Error("Cover Letter not found");
  }
  return result;
};

/**
 * Deletes a specific cover letter
 * @param {string} id - The id of the cover letter to delete
 * @returns {Promise<ICoverLetter | null>} The deleted cover letter
 */
export const deleteCoverLetter = async (id: string) => {
  const result = await CoverLetterSchema.findByIdAndDelete(id).lean();
  if (!result) {
    throw new Error("Cover Letter not found");
  }
  return result;
};

/**
 * Retrieves all cover letters of a specific user
 * @param {string} userId - The id of the user
 * @returns {Promise<ICoverLetter[]>} Array of cover letters of the user
 */
export const getCoverLetterByUserId = async (userId: string) => {
  const result = await CoverLetterSchema.find({ userId: userId }).lean();
  return result;
};
