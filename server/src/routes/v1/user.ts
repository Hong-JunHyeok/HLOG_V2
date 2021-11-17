import { NextFunction, Request, Response, Router } from "express";
import { useRecoilSnapshot } from "recoil";
import { getConnection, getRepository } from "typeorm";
import { User } from "../../entity/User";
import { UserRepository } from "../../repository/UserRepository";
import setJsonResponser from "../../utils/setJsonResponser";

const router = Router();

router.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["username", "email", "createdAt", "updatedAt"],
    });

    setJsonResponser(res, {
      code: 200,
      message: "모든 유저 조회성공",
      payload: users,
    });
  }
);

export default router;
