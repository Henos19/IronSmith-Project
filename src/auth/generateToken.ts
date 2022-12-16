import { sign, SignOptions } from 'jsonwebtoken';
import { IUser } from '../interfaces';

const secret = 'segredo';

export default (user: IUser) => {
  const jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  const token = sign({ data: { userId: user.id } }, secret, jwtConfig);
  return token;
};