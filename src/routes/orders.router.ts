import { Router } from 'express';
import validateToken from '../auth/validateToken';
import OrderController from '../controllers/orders.controller';

const ordersRouter = Router();
const orderController = new OrderController();

ordersRouter.get('/', orderController.getOrders.bind(orderController));
ordersRouter.post('/', validateToken, orderController.createOrders.bind(orderController));

export default ordersRouter;