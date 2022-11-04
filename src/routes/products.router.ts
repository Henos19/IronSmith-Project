import { Router } from 'express';
import ProductController from '../controllers/products.controller';

const productsRouter = Router();
const productsController = new ProductController();

productsRouter.get('/', productsController.getProducts.bind(productsController));
productsRouter.post('/', productsController.createProduct.bind(productsController));

export default productsRouter;