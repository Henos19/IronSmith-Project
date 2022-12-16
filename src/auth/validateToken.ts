import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import HttpRequestError from '../errors';
import UserService from '../services/users.service';

const secret = 'segredo';
const userServicer = new UserService();

const validateToken = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization');

  if (!token) throw new HttpRequestError(401, 'Token not found');
  
  const jwt = verify(token, secret, (err, decode) => {
    if (err) throw new HttpRequestError(401, 'Invalid token');
    return decode;
  }) as unknown as JwtPayload;
  
  const user = await userServicer.getUserById(jwt.data.userId);

  if (!user) throw new HttpRequestError(404, 'User not found');
  req.body.userId = user.id;
  next();
};

export default validateToken;
