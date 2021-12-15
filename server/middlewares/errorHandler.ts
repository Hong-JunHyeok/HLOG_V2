import { NextFunction, Request, Response } from "express";
import setJsonResponser from "../utils/setJsonResponser";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //! 에러 핸들러
  setJsonResponser(res, {
    code: 500,
    message: "서버 에러",
    payload: error,
  });
};

export default errorHandler;
