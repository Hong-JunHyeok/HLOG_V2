import { NextFunction, Request, Response, Router } from "express";
import { User } from "../../entity/User";
import { IUserJoin } from "../../types/JoinTypes";
import setJsonResponser from "../../utils/setJsonResponser";
import _ from "lodash";
import { getRepository } from "typeorm";
import { LoginTypes } from "../../types/LoginTypes";
import bcrypt from "bcrypt";

const router = Router();

router.post(
  "/join",
  async (req: Request, res: Response, next: NextFunction) => {
    const joinData = req.body as IUserJoin;

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

      const encryptedJoinData = {
        ...joinData,
        password: await bcrypt.hash(joinData.password, 12),
      };

      await userRepository.save(encryptedJoinData);
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

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const loginData = req.body as LoginTypes;

    try {
      if (!loginData.email.trim() || !loginData.password.trim()) {
        return setJsonResponser(res, {
          code: 403,
          message: "아이디, 비밀번호가 비었습니다.",
        });
      }

      const userRepository = getRepository(User);
      const existUser = await userRepository.findOne({
        where: {
          email: loginData.email,
        },
      });

      if (!existUser) {
        return setJsonResponser(res, {
          code: 403,
          message: "아이디가 틀렸습니다.",
        });
      }

      const isCorrectPassword = await bcrypt.compare(
        loginData.password.trim(),
        existUser.password
      );

      if (!isCorrectPassword) {
        return setJsonResponser(res, {
          code: 403,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      setJsonResponser(res, {
        code: 201,
        message: "로그인 성공",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
