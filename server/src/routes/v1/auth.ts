import { NextFunction, Request, Response, Router } from "express";
import { User } from "../../entity/User";
import { IUserJoin } from "../../types/JoinTypes";
import setJsonResponser from "../../utils/setJsonResponser";
import _ from "lodash";
import { getRepository } from "typeorm";

const router = Router();

router.post(
  "/join",
  async (req: Request, res: Response, next: NextFunction) => {
    const joinData: IUserJoin = req.body;

    try {
      if (!joinData.email || !joinData.password || !joinData.username) {
        return setJsonResponser(res, {
          code: 403,
          message: "누락된 회원정보가 있습니다.",
        });
      }

      const existEmail = await User.findOne({
        where: { email: joinData.email.trim() },
      });

      if (existEmail) {
        return setJsonResponser(res, {
          code: 403,
          message: "이미 존재하는 이메일입니다.",
        });
      }

      const existUsername = await User.findOne({
        where: { username: joinData.username.trim() },
      });

      if (existUsername) {
        return setJsonResponser(res, {
          code: 403,
          message: "이미 존재하는 이름입니다.",
        });
      }

      const userRepository = getRepository(User);
      await userRepository.save(joinData);
      setJsonResponser(res, {
        code: 201,
        message: "회원가입 성공",
        payload: joinData,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
