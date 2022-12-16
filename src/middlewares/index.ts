import { NextFunction, Request, Response } from 'express';
import HttpRequestError from '../errors';

const errorMiddleware = (
  err: HttpRequestError, 
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { status, message } = err;
  
  if (status) return res.status(status).json({ message });
  
  next();
};

export default errorMiddleware;
