import { Router } from 'express';
import UserController from '../controllers/users.controller';

const loginRouter = Router();
const userController = new UserController();

loginRouter.post('/', userController.userLogin.bind(userController));

export default loginRouter;