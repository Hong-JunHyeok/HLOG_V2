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
      callback(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

router.patch(
  "/profile/:userId",
  upload.single("profile"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.file);

      return setJsonResponser(res, { code: 201, message: "Good worked" });
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
