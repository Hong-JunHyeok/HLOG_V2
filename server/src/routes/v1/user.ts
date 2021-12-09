import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import tokenValidator from "../../middlewares/tokenValidator";
import setJsonResponser from "../../utils/setJsonResponser";

const router = Router();

router.get("/me", tokenValidator, async (req, res, next) => {
  const userRepository = getRepository(User);

  const me = await userRepository.findOne({
    where: { email: req.body.decodedUserPayload.email },
    select: [
      "id",
      "username",
      "email",
      "createdAt",
      "updatedAt",
      "selfIntroduction",
      "profileUrl",
    ],
  });

  setJsonResponser(res, {
    code: 200,
    message: "내 정보 조회성공",
    payload: me,
  });
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "profiles/");
    },
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname); // 확장자 추출(png)
      const basename = path.basename(file.originalname, ext);
      callback(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
});

router.patch(
  "/profile/:userId",
  upload.single("profile"),
  tokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRepository = getRepository(User);

      const me = await userRepository.findOne({
        where: { email: req.body.decodedUserPayload.email },
      });

      if (!me) {
        return setJsonResponser(res, {
          code: 403,
          message: "유저 정보가 없습니다.",
        });
      }

      await userRepository
        .createQueryBuilder()
        .update()
        .set({
          profileUrl: res.req.file.path,
        })
        .where("id = :id", { id: me.id })
        .execute();

      return setJsonResponser(res, {
        code: 201,
        message: "프로필 이미지를 변경했습니다.",
        payload: {
          profileImage: res.req.file.path,
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/users",
  tokenValidator,
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
