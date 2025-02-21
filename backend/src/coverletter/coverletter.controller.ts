import * as CoverLetterService from "./coverletter.service";
import { type Request, type Response } from "express";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { IUser } from "../users/user.dto";
/**
 * Fetches all cover letters.
 * @route GET /cover-letters
 * @access public
 * @returns A list of all cover letters.
 */
export const getAllCoverLetter = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await CoverLetterService.getAllCoverLetter();
        res.send(createResponse(result, "Cover Letter Fetched Successfully"));
    }
);

/**
 * Creates a new cover letter.
 * @route POST /cover-letters
 * @access private
 * @param req.body - The cover letter data to create.
 * @returns The created cover letter.
 */
export const createCoverLetter = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await CoverLetterService.createCoverLetter(req.body);
        res.send(createResponse(result, "Cover Letter Created Successfully"));
    }
);

/**
 * Updates an existing cover letter.
 * @route PATCH /cover-letters/:id
 * @access private
 * @param req.params.id - The ID of the cover letter to update.
 * @param req.body - The updated cover letter data.
 * @returns The updated cover letter.
 */
export const updateCoverLetter = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await CoverLetterService.updateCoverLetter(id, req.body);
        res.send(createResponse(result, "Cover Letter Updated Successfully"));
    }
);

/**
 * Deletes a cover letter.
 * @route DELETE /cover-letters/:id
 * @access private
 * @param req.params.id - The ID of the cover letter to delete.
 * @returns The deleted cover letter.
 */
export const deleteCoverLetter = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await CoverLetterService.deleteCoverLetter(id);
        res.send(createResponse(result, "Cover Letter Deleted Successfully"));
    }
);

/**
 * Fetches cover letters of the current user.
 * @route GET /cover-letters/my
 * @access private
 * @returns The cover letters of the current user.
 */
export const getCoverLetterByUserId = asyncHandler(
    async (req: Request, res: Response) => {
        const id = (req.user as IUser)?._id;
        const result = await CoverLetterService.getCoverLetterByUserId(id);
        res.send(createResponse(result, "Cover Letter Fetched Successfully"));
    }
);

/**
 * Fetches a specific cover letter by ID.
 * @route GET /cover-letters/:id
 * @access public
 * @param req.params.id - The ID of the cover letter to fetch.
 * @returns The cover letter with the specified ID.
 */
export const getCoverLetterById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await CoverLetterService.getCoverLetterById(id);
        res.send(createResponse(result, "Cover Letter Fetched Successfully"));
    }
);

