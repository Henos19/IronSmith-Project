import { Request, Response } from 'express';
import ProductService from '../services/products.service';

export default class ProductController {
  public service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  async getProducts(_req: Request, res: Response) {
    const products = await this.service.getProducts();
    res.status(200).json(products);
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const { status, message } = await this.service.createProduct(req.body);
    res.status(status).json(message);
  }
}