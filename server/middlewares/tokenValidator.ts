import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import setJsonResponser from "../utils/setJsonResponser";

type TokenInterface = {
  userId: number
}

export const refreshTokenValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.JWT;
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    if(decoded) {
      req.body.decodedUserId = (decoded as TokenInterface).userId;
      next();
    }
  } catch(error) {
    if (error.name === "JsonWebTokenError") {
      return setJsonResponser(res, {
        code: 401,
        message: error.message,
        payload: error,
      });
    } else if (error.name === "TokenExpiredError") {
      return setJsonResponser(res, {
        code: 403,
        message: error.message,
        payload: error,
      });
    } else {
      next(error);
    }
  }
}

export const accessTokenValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestedAccessToken = req.headers.authorization;
    const decoded = jwt.verify(requestedAccessToken, process.env.JWT_SECRET);

    if (decoded) {
      req.body.decodedUserId = (decoded as TokenInterface).userId;
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
        code: 403,
        message: error.message,
        payload: error,
      });
    } else {
      next(error);
    }
  }
};
