import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import { IUser } from '../interfaces';

export default class UserModel {
  public connection: Pool;

  constructor(myqsl: Pool) {
    this.connection = myqsl;
  }

  async getUserById(id: number): Promise<IUser | undefined> {
    const mysql = 'SELECT * FROM Trybesmith.Users WHERE id = ?';
    const [[result]] = await this.connection
      .execute<IUser[] & RowDataPacket[][]>(mysql, [id]);

    return result;
  }

  async getUserByUsername(username: string): Promise<IUser | undefined> {
    const mysql = 'SELECT * FROM Trybesmith.Users WHERE username = ?';

    const [[result]] = await this.connection
      .execute<IUser[] & RowDataPacket[][]>(mysql, [username]);

    return result;
  }

  async createUser(user: IUser): Promise<number> {
    const mysql = `INSERT INTO Trybesmith.Users
    (username, classe, level, password) VALUES (?, ?, ?, ?)`;

    const [{ insertId }] = await this.connection
      .execute<number & ResultSetHeader>(
      mysql,
      [user.username, user.classe, user.level, user.password],
    );

    return insertId;
  }
}
