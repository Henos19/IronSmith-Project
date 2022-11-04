import { Request, Response } from 'express';
import UserService from '../services/users.service';

export default class UserController {
  public service: UserService;

  constructor() {
    this.service = new UserService();
  }

  /* async getUsers(_req: Request, res: Response) {
    const products = await this.service.getProducts();
    res.status(200).json(products);
  } */

  async createUser(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    const { status, message } = await this.service.createUser(req.body);
    res.status(status).json({ token: message });
  }
}