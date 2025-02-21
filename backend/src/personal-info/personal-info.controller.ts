import * as PersonalInfoService from "./personal-info.service";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { IPersonalInfo } from "./personal-info.dto";

export const getAllPersonalInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await PersonalInfoService.getAllPersonalInfo();
    res.send(createResponse(result, "Personal Info Fetched Successfully"));
  }
);

export const createPersonalInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await PersonalInfoService.createPersonalInfo(req.body);
    res.send(createResponse(result, "Personal Info Created Successfully"));
  }
);

export const updatePersonalInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PersonalInfoService.updatePersonalInfo(id, req.body);
    res.send(createResponse(result, "Personal Info Updated Successfully"));
  }
);

export const deletePersonalInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PersonalInfoService.deletePersonalInfo(id);
    res.send(createResponse(result, "Personal Info Deleted Successfully"));
  }
);

export const getPersonalInfoById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PersonalInfoService.getPersonalInfoById(id);
    res.send(createResponse(result, "Personal Info Fetched Successfully"));
  }
);
