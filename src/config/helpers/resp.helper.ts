import { Response } from 'express';

const respWithMsg = (res: Response, status: number, message: string, data?: any) => {
  return res.status(status).json({ message, code: status, ...data });
};

export const respOk = (res: Response, message: string, data?: any) => {
  return respWithMsg(res, 200, message, data);
};

export const respCreated = (res: Response, message: string, data?: any) => {
  return respWithMsg(res, 201, message, data);
};

export const respBadRequest = (res: Response, message: string, data?: any) => {
  return respWithMsg(res, 400, message, data);
};

export const respUnauthorized = (res: Response, message: string, data?: any) => {
  return respWithMsg(res, 401, message, data);
};

export const respForbidden = (res: Response, message: string, data?: any) => {
  return respWithMsg(res, 403, message, data);
};

export const respNotFound = (res: Response, message: string, data?: any) => {
  return respWithMsg(res, 404, message, data);
};

export const respConflict = (res: Response, message: string, data?: any) => {
  return respWithMsg(res, 409, message, data);
};

export const respServerError = (res: Response, message: string, data?: any) => {
  return respWithMsg(res, 500, message, data);
};

export const respWithStatus = (
  res: Response,
  status: number,
  message: string,
  data?: any,
) => {
  return respWithMsg(res, status, message, data);
};
