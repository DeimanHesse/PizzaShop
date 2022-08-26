import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
    AllowNull,
    HasMany,
    ForeignKey,
    HasOne,
    BelongsTo,
  } from 'sequelize-typescript';
import { OrderList } from 'src/order-list/order-list.model';
import { User } from 'src/users/users.model';
// import { Cartproduct } from 'src/carts/cartproduct.model';
// import { Order } from 'src/orders/orders.model';
// import { Type } from 'src/types/types.model';

interface OrderListCreationAttrs {
  name: string;
  price: string;
  weight: string;
  size: string;
  image: string;
  typeId: string;
}
  
  //создаём интерфейс типизации для создания объекта из нашего класса
  interface OrderCreationAttrs {
    name: string;
    address: string;
    status: string;
    phoneNumber: string;
    sum: string;
    userId: string;
    date: string;
  }
  
  @Table({ tableName: 'orders' })
  export class Order extends Model<Order, OrderCreationAttrs> {
    //для того, чтобы эти поля стали колонками в таблице их нужно пометить декоратором @Colum и указат опции
  
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true,})
    id: number;
    
    @Column({ type: DataType.STRING,  allowNull: false })
    name: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    address: string;

    @Column({ type: DataType.STRING, allowNull: false })
    status: string;

    @Column({ type: DataType.STRING , allowNull: false })
    phoneNumber: string;

    @Column({ type: DataType.STRING , allowNull: false })
    sum: string;

    @Column({ type: DataType.STRING , allowNull: false })
    date: string;

  
    //связь между таблицами
    // @BelongsToMany(() => Cart, () => Cartproduct)
    // carts: Cart[];
  
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: string;
  
    @BelongsTo(()=> User)
    user: User;
    
    // связь с постами
    @HasMany(() => OrderList)
    orderLists: OrderList[];
  }
  