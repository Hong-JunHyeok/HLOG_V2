import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import setJsonResponser from "../utils/setJsonResponser";

const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestedAccessToken = req.headers.authorization;
    const decoded = jwt.verify(requestedAccessToken, process.env.JWT_SECRET);

    if (decoded) {
      req.body.decodedUserPayload = decoded;
      next();
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return setJsonResponser(res, {
        code: 401,
        message: error.message,
        payload: error,
      });
    } else if (error.name === "TokenExpiredError") {
      return setJsonResponser(res, {
        code: 419,
        message: error.message,
        payload: error,
      });
    } else {
      next(error);
    }
  }
};

export default tokenValidator;
