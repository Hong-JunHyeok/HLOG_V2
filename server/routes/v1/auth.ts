import { NextFunction, Request, Response, Router } from "express";
import { User } from "../../entity/User";
import { IUserJoin } from "../../types/JoinTypes";
import setJsonResponser from "../../utils/setJsonResponser";
import { getRepository } from "typeorm";
import { LoginTypes } from "../../types/LoginTypes";
import bcrypt from "bcrypt";
import { Token } from "../../utils/token";
import { accessTokenValidator, refreshTokenValidator } from "../../middlewares/tokenValidator";

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

      const newUser = userRepository.create(encryptedJoinData);
      await userRepository.save(newUser);

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

router.post('/refresh',refreshTokenValidator, (req,res) => {
  const userId = req.body.decodedUserId;
  const refreshedAccessToken = Token.createAccessToken(userId);

  setJsonResponser(res, {
    code: 201,
    message: "정상적으로 토큰이 발급되었습니다.",
    payload: {
      accessToken: refreshedAccessToken
    }
  })
})

router.delete('/:userId', accessTokenValidator, async (req, res, next) => {
  const userId = req.params.userId;
  
  try {
    const userRepository = getRepository(User);

    await userRepository.createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id: userId })
    .execute();

    setJsonResponser(res, {
      code: 201,
      message: "성공적으로 탈퇴를 했습니다.",
    });
  } catch (error) {
    console.error(error);

    next(error);
  }
})

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const loginData = req.body as LoginTypes;
    const { email, password } = loginData;

    try {
      if (!email || !password) {
        return setJsonResponser(res, {
          code: 403,
          message: "아이디, 비밀번호를 입력해주세요.",
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

      const accessToken = Token.createAccessToken(existUser.id);
      const refreshToken = Token.createRefreshToken(existUser.id);

      res.cookie('hlogRefreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1d
      });

      setJsonResponser(res, {
        code: 201,
        message: "로그인 성공",
        payload: {
          accessToken,
          user: {
            id: existUser.id,
            createdAt: existUser.createdAt,
            updatedAt: existUser.updatedAt,
            username: existUser.username,
            selfIntroduction: existUser.selfIntroduction,
            email: existUser.email,
          },
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post('/logout', async(req,res) => {
  res.clearCookie('JWT', {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  });

  return res.sendStatus(204);
})

export default router;
