import { NextFunction, Request, Response, Router } from "express";
import { useRecoilSnapshot } from "recoil";
import { getConnection } from "typeorm";
import { UserRepository } from "../../repository/UserRepository";
import setJsonResponser from "../../utils/setJsonResponser";

const router = Router();

router.get("/users", (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getConnection().getCustomRepository(UserRepository);

  setJsonResponser(res, {
    code: 200,
    message: "모든 유저 조회성공",
    payload: userRepository.getAllUsers(),
  });
});

export default router;
