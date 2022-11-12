import { ICreateOrder, IOrder } from '../interfaces';
import schemas from './validations';
import connection from '../models/connection';
import OrderModel from '../models/orders.model';
import HttpRequestError from '../errors';
import ProductModel from '../models/products.model';

export default class OrderService {
  public validations;
  
  public model: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.validations = schemas;
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  async getOrders(): Promise<IOrder[]> {
    const orders: IOrder[] = await this.model.getOrders();
    return orders;
  }

  async createOrders(orders: ICreateOrder): Promise<ICreateOrder> {
    const { error } = this.validations.createOrderSchema.validate(orders);

    if (error) {
      const status = this.validations.checkErrorForStatus(error.message);
      throw new HttpRequestError(status, error.message);
    }
    
    const { productsIds, userId } = orders;
    
    if (productsIds.some((id) => typeof id !== 'number')
    || productsIds.length === 0) {
      throw new HttpRequestError(422, '"productsIds" must include only numbers');
    }

    const newOrderId = await this.model.createOrder(userId);

    const updateProducts = productsIds
      .map(async (productId) => this.productModel.updateProduct(productId, newOrderId));
      
    await Promise.all(updateProducts);

    return orders;
  }
}