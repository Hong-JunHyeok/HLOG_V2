import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import {accessTokenValidator} from "../../middlewares/tokenValidator";
import setJsonResponser from "../../utils/setJsonResponser";

const router = Router();

router.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      const userRepository = getRepository(User);
      const users = await userRepository.find()
  
      setJsonResponser(res, {
        code: 200,
        message: "모든 유저 조회성공",
        payload: users,
      });
    } catch(error) {
      next(error);
    }
  }
);

router.get("/me", accessTokenValidator, async (req, res, next) => {
  const userRepository = getRepository(User);

  try {
    const me = await userRepository.findOne({
      where: { id: req.body.decodedUserId },
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
      payload: {
        user: me
      },
    });
  } catch (error) {
    next(error);
  }
});


router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const userRepository = getRepository(User);

    const foundUser = await userRepository.findOne({
      where: { id: parseInt(userId) },
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
      message: "유저 정보 조회성공",
      payload: { user: foundUser },
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/meta",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRepository = getRepository(User);
      const { username, selfIntroduction } = req.body;

      const me = await userRepository.findOne({
        where: { id: req.body.decodedUserId },
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
          username,
          selfIntroduction
        })
        .where("id = :id", { id: me.id })
        .execute();

      return setJsonResponser(res, {
        code: 201,
        message: "유저 정보를 변경했습니다.",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "profiles/");
    },
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const timestamp = new Date().getTime().valueOf();
      const filename = path.basename(file.originalname, ext) + timestamp + ext;
      callback(null, filename + ext);
    },
  }),
}).single("profile");

router.delete(
  "/profile",
  accessTokenValidator,
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
    const me = await userRepository.findOne({
      where: { id: req.body.decodedUserId },
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
          profileUrl: null,
        })
        .where("id = :id", { id: me.id })
        .execute();

    return setJsonResponser(res, {
      code: 201,
      message: "프로필 이미지 삭제했습니다.",
      }
    );
  }
);

router.patch(
  "/profile",
  accessTokenValidator,
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
    const me = await userRepository.findOne({
      where: { id: req.body.userId },
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
          profileUrl: req.file.path,
        })
        .where("id = :id", { id: me.id })
        .execute();

    return setJsonResponser(res, {
      code: 201,
      message: "프로필 이미지를 변경했습니다.",
      payload: {
          profileImage: req.file.path,
        }
      }
    );
  }
);

export default router;
