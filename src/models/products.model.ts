import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import { IProduct } from '../interfaces';

export default class ProductModel {
  public connection: Pool;

  constructor(myqsl: Pool) {
    this.connection = myqsl;
  }

  async getProducts(): Promise<IProduct[]> {
    const mysql = 'SELECT id, name, amount FROM Trybesmith.Products';

    const [result] = await this.connection.execute<IProduct[] & RowDataPacket[]>(mysql);
    return result;
  }

  async getProductById(id: number): Promise<IProduct | undefined> {
    const mysql = 'SELECT id, name, amount FROM Trybesmith.Products WHERE id = ?';

    const [[result]] = await this.connection
      .execute<IProduct[] & RowDataPacket[][]>(mysql, [id]);

    return result;
  }

  async updateProduct(id: number, orderId: number) {
    const query = `UPDATE Trybesmith.Products
      SET orderId = ?
      WHERE id = ?;`;

    await this.connection.execute<ResultSetHeader>(query, [orderId, id]);
  }

  async createProduct(product: IProduct): Promise<IProduct> {
    const mysql = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';

    const [{ insertId }] = await this.connection
      .execute<number & ResultSetHeader>(mysql, [product.name, product.amount]);

    return { id: insertId, ...product };
  }
}
