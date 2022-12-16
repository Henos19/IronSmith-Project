import { Request, Response } from 'express';
import OrderService from '../services/orders.service';

export default class OrderController {
  public service: OrderService;

  constructor() {
    this.service = new OrderService();
  }

  async getOrders(_req: Request, res: Response) {
    const orders = await this.service.getOrders();
    res.status(200).json(orders);
  }

  async createOrders(req: Request, res: Response) {
    const orders = await this.service.createOrders(req.body);
    res.status(201).json(orders);
  }
}