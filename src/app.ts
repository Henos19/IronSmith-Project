import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares';
import loginRouter from './routes/login.router';
import ordersRouter from './routes/orders.router';
import productsRouter from './routes/products.router';
import usersRouter from './routes/users.router';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/login', loginRouter);

app.use(errorMiddleware);

export default app;
