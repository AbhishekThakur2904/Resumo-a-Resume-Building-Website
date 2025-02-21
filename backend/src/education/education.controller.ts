import * as EducationService from "./education.service";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

/**
 * Fetches all education entries.
 * @route GET /education
 * @access public
 * @returns A list of all education entries.
 */
export const getAllEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await EducationService.getAllEducation();
    res.send(createResponse(result, "Education Fetched Successfully"));
  }
);

/**
 * Creates a new education entry.
 * @route POST /education
 * @access public
 * @param req.body - The education data to create.
 * @returns The created education entry.
 */
export const createEducation = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const result = await EducationService.createEducation(req.body);
    res.send(createResponse(result, "Education Created Successfully"));
  }
);

/**
 * Updates an existing education entry.
 * @route PATCH /education/:id
 * @access public
 * @param req.params.id - The ID of the education entry to update.
 * @param req.body - The updated education data.
 * @returns The updated education entry.
 */
export const updateEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await EducationService.updateEducation(id, req.body);
    res.send(createResponse(result, "Education Updated Successfully"));
  }
);

/**
 * Deletes an education entry.
 * @route DELETE /education/:id
 * @access public
 * @param req.params.id - The ID of the education entry to delete.
 * @returns The deleted education entry.
 */
export const deleteEducation = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await EducationService.deleteEducation(id);
    res.send(createResponse(result, "Education Deleted Successfully"));
  }
);

