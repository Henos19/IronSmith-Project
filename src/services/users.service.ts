import HttpRequestError from '../errors';
import { ILogin, IUser } from '../interfaces';
import schemas from './validations';
import connection from '../models/connection';
import UserModel from '../models/users.model';
import generateToken from '../auth/generateToken';

export default class UserService {
  public validations;

  public model: UserModel;

  constructor() {
    this.validations = schemas;
    this.model = new UserModel(connection);
  }

  async getUserById(id: number): Promise<IUser | undefined> {
    const user = await this.model.getUserById(id);
    return user;
  }

  async verifyIfUserExist(username: string): Promise<IUser | undefined> {
    const verifyIfUserExist = await this.model.getUserByUsername(username);
    return verifyIfUserExist;
  }

  async userLogin(login: ILogin): Promise<{ status: number, message: string }> {
    const { error } = this.validations.loginSchema.validate(login);
    if (error) throw new HttpRequestError(400, error.message);

    const getUser = await this.verifyIfUserExist(login.username);
    if (!getUser || login.password !== getUser.password) {
      throw new HttpRequestError(401, 'Username or password invalid');
    }

    const token = generateToken({ id: getUser.id, ...getUser });
    return { status: 200, message: token };
  }

  async createUser(user: IUser)
    : Promise<{ status: number, message: string }> {
    const { error } = this.validations.userSchema.validate(user);
    
    if (error) {
      const status = this.validations.checkErrorForStatus(error.message);
      throw new HttpRequestError(status, error.message);
    }

    const verifiedUser = await this.verifyIfUserExist(user.username);
    if (verifiedUser) {
      throw new HttpRequestError(409, 'User already exists');
    }

    const insertId = await this.model.createUser(user);
    const token = generateToken({ id: insertId, ...user });
    return { status: 201, message: token };
  }
}