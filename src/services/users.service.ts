import HttpRequestError from '../errors';
import { IUser } from '../interfaces';
import schemas from './validations';
import connection from '../models/connection';
import UserModel from '../models/users.model';
import generateToken from '../auth/generateToken';

export default class ProductService {
  public validations;

  public model: UserModel;

  constructor() {
    this.validations = schemas;
    this.model = new UserModel(connection);
  }

  /* async getUsers(): Promise<IUser[]> {
    const products: IUser[] = await this.model.getUsers();
    return products;
  } */

  async createUser(user: IUser)
    : Promise<{ status: number, message: string }> {
    const { error } = this.validations.userSchema.validate(user);
    
    if (error) {
      const status = this.validations.checkErrorForStatus(error.message);
      throw new HttpRequestError(status, error.message);
    }

    const verifyIfUserExist = await this.model.getUserByUsername(user.username);
    if (verifyIfUserExist) {
      throw new HttpRequestError(409, 'User already exists');
    }

    const insertId = await this.model.createUser(user);
    const token = generateToken({ id: insertId, ...user });
    return { status: 201, message: token };
  }
}