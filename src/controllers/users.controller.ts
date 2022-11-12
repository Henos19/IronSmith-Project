import { Request, Response } from 'express';
import UserService from '../services/users.service';

export default class UserController {
  public service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async userLogin(req: Request, res: Response) {
    const { status, message } = await this.service.userLogin(req.body);
    res.status(status).json({ token: message });
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { status, message } = await this.service.createUser(req.body);
    res.status(status).json({ token: message });
  }
}