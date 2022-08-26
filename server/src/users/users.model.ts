import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript';
import { Order } from 'src/orders/orders.model';

import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

//создаём интерфейс типизации для создания объекта из нашего класса
interface UserCreationAttrs {
  name: string;
  phoneNumber: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  //для того, чтобы эти поля стали колонками в таблице их нужно пометить декоратором @Colum и указат опции

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true,primaryKey: true,})
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  // связь между таблицами
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Order)
  orders: Order[];
  //связь с КОРЗИНОЙ
//   @HasOne(() => Cart)
//   cart: Cart;
}
