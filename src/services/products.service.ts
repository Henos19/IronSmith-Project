import HttpRequestError from '../errors';
import { IProduct } from '../interfaces';
import schemas from './validations';
import connection from '../models/connection';
import ProductModel from '../models/products.model';

export default class ProductService {
  public validations;

  public model: ProductModel;

  constructor() {
    this.validations = schemas;
    this.model = new ProductModel(connection);
  }

  async getProducts(): Promise<IProduct[]> {
    const products: IProduct[] = await this.model.getProducts();
    return products;
  }

  async createProduct(product: IProduct)
    : Promise<{ status: number, message: IProduct }> {
    const { error } = this.validations.productSchema.validate(product);

    if (error) {
      const status = this.validations.checkErrorForStatus(error.message);
      console.log(error, error.message, status);
      throw new HttpRequestError(status, error.message);
    }
    
    const createdProduct = await this.model.createProduct(product);
    return { status: 201, message: createdProduct };
  }
}