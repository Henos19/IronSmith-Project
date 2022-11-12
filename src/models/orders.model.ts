import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import { IOrder } from '../interfaces';

export default class OrderModel {
  public connection: Pool;

  constructor(myqsl: Pool) {
    this.connection = myqsl;
  }

  async getOrders(): Promise<IOrder[]> {
    const mysql = `
    SELECT orders.id as id, orders.userId, json_arrayagg(products.id) AS productsIds 
    FROM Trybesmith.Orders AS orders
    INNER JOIN Trybesmith.Products AS products
    ON orders.id = products.orderId
    GROUP BY orders.userId, orders.id
    ORDER BY orders.id;`;

    const [result] = await this.connection.execute<IOrder[] & RowDataPacket[]>(mysql);
    return result;
  }

  async createOrder(userId: number): Promise<number> {
    const mysql = `INSERT INTO Trybesmith.Orders
    (userId) VALUES (?)`;
    const [{ insertId }] = await this
      .connection.execute<number & ResultSetHeader>(mysql, [userId]);

    return insertId;
  }
}
