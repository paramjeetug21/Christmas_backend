import { Router } from "express";
import { signup, login, getAllUsers } from "./user.controller";

const userRouter = Router();


userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/', getAllUsers);

export default userRouter;