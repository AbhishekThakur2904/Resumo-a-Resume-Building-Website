import * as ExperienceService from "./experience.service";
import { type Request, type Response } from "express";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
/**
 * @function getAllExperience
 * @description Fetches all experience records.
 * @returns {Promise<Response>} The response object with the experience records.
 */
export const getAllExperience = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await ExperienceService.getAllExperience();
        res.send(createResponse(result, "Experience Fetched Successfully"));
    }
);

/**
 * @function createExperience
 * @description Creates a new experience record.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @returns {Promise<Response>} The response object with the newly created experience record.
 */
export const createExperience = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await ExperienceService.createExperience(req.body);
        res.send(createResponse(result, "Experience Created Successfully"));
    }
);

/**
 * @function updateExperience
 * @description Updates an existing experience record.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @returns {Promise<Response>} The response object with the updated experience record.
 */
export const updateExperience = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await ExperienceService.updateExperience(id, req.body);
        res.send(createResponse(result, "Experience Updated Successfully"));
    }
);  

/**
 * @function deleteExperience
 * @description Deletes an existing experience record.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @returns {Promise<Response>} The response object with the deleted experience record.
 */
export const deleteExperience = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await ExperienceService.deleteExperience(id);
        res.send(createResponse(result, "Experience Deleted Successfully"));
    }
);

/**
 * @function getExperienceById
 * @description Fetches a specific experience record by ID.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @returns {Promise<Response>} The response object with the experience record.
 */
export const getExperienceById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await ExperienceService.getExperienceById(id);
        res.send(createResponse(result, "Experience Fetched Successfully"));
    }
);

