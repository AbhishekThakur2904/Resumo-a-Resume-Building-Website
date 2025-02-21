import ResumeSchema from "./resume.schema";
import { IResume } from "./resume.dto";
/**
 * @file Contains functions for interacting with the Resume model
 */

/**
 * Retrieves all resumes
 * @returns {Promise<IResume[]>} An array of all resumes
 */
export const getAllResume = async () => {
  const result = await ResumeSchema.find().lean();
  return result;
};

/**
 * Creates a new resume
 * @param {IResume} data - Data to be inserted into the database
 * @param {string} userId - The id of the user creating the resume
 * @returns {Promise<IResume>} The newly created resume
 */
export const createResume = async (data: IResume, userId: string) => {
  const result = await ResumeSchema.create({ ...data, userId });
  return result;
};

/**
 * Updates a resume
 * @param {string} id - The id of the resume to be updated
 * @param {IResume} data - Data to be inserted into the database
 * @returns {Promise<IResume>} The updated resume
 */
export const updateResume = async (id: string, data: IResume) => {
  const result = await ResumeSchema.findByIdAndUpdate(
    id,
    { ...data },
    { new: true, runValidators: true }
  ).lean();
  if (!result) {
    throw new Error("Resume not found");
  }
  return result;
};

/**
 * Deletes a resume
 * @param {string} id - The id of the resume to be deleted
 * @returns {Promise<IResume>} The deleted resume
 */
export const deleteResume = async (id: string) => {
  const result = await ResumeSchema.findByIdAndDelete(id).lean();
  if (!result) {
    throw new Error("Resume not found");
  }
  return result;
};

/**
 * Retrieves a resume by id
 * @param {string} id - The id of the resume
 * @returns {Promise<IResume>} The resume
 */
export const getResumeById = async (id: string) => {
  const result = await ResumeSchema.findById(id)
    ?.populate("experience")
    ?.populate("personalInfo")
    ?.populate("education")
    .lean();
  return result;
};

/**
 * Retrieves all resumes by user id
 * @param {string} userId - The id of the user
 * @returns {Promise<IResume[]>} An array of all resumes of the user
 */
export const getResumeByUserId = async (userId: string) => {
  const result = await ResumeSchema.find({ userId: userId })
    ?.populate("experience")
    ?.populate("personalInfo")
    ?.populate("education")
    .lean();
  return result;
};

