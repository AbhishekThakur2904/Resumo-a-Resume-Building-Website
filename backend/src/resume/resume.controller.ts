import * as ResumeService from "./resume.service";
import { type Request, type Response } from "express";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { IUser } from "../users/user.dto";
/**
 * Fetches all resumes.
 * @route GET /resumes
 * @access public
 * @returns A list of all resumes.
 */
export const getAllResume = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ResumeService.getAllResume();
    res.send(createResponse(result, "Resume Fetched Successfully"));
  }
);

/**
 * Creates a new resume.
 * @route POST /resumes
 * @access private
 * @param req.body - The resume data to create.
 * @returns The created resume.
 */
export const createResume = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req.user as IUser)?._id;
    const result = await ResumeService.createResume(req.body, userId);
    res.send(createResponse(result, "Resume Created Successfully"));
  }
);

/**
 * Updates an existing resume.
 * @route PATCH /resumes/:id
 * @access private
 * @param req.params.id - The ID of the resume to update.
 * @param req.body - The updated resume data.
 * @returns The updated resume.
 */
export const updateResume = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ResumeService.updateResume(id, req.body);
    res.send(createResponse(result, "Resume Updated Successfully"));
  }
);

/**
 * Deletes a resume.
 * @route DELETE /resumes/:id
 * @access private
 * @param req.params.id - The ID of the resume to delete.
 * @returns The deleted resume.
 */
export const deleteResume = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ResumeService.deleteResume(id);
    res.send(createResponse(result, "Resume Deleted Successfully"));
  }
);

/**
 * Fetches a specific resume by ID.
 * @route GET /resumes/:id
 * @access public
 * @param req.params.id - The ID of the resume to fetch.
 * @returns The resume with the specified ID.
 */
export const getResumeById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ResumeService.getResumeById(id);
    res.send(createResponse(result, "Resume Fetched Successfully"));
  }
);

/**
 * Fetches resumes of the current user.
 * @route GET /resumes/my
 * @access private
 * @returns The resumes of the current user.
 */
export const getResumeByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const id = (req.user as IUser)?._id;
    const result = await ResumeService.getResumeByUserId(id);
    res.send(createResponse(result, "Resume Fetched Successfully"));
  }
);

