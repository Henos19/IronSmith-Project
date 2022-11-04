import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import HttpRequestError from './errors';
import productsRouter from './routes/products.router';
import usersRouter from './routes/users.router';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.use((err: HttpRequestError, req: Request, res: Response, next: NextFunction) => {
  const { status, message } = err;

  if (status) return res.status(status).json({ message });

  next();
});

export default app;
