import { Response } from "express";

interface ResponseObject {
  code: number;
  message?: string;
  payload: any;
}

const setJsonResponser = (res: Response, resObj: ResponseObject) => {
  res.status(resObj.code).json({ ...resObj });
};

export default setJsonResponser;
