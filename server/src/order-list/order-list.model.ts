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
import { Order } from 'src/orders/orders.model';
// import { Cartproduct } from 'src/carts/cartproduct.model';
// import { Order } from 'src/orders/orders.model';
// import { Type } from 'src/types/types.model';
  

  
  //создаём интерфейс типизации для создания объекта из нашего класса
  interface OrderListCreationAttrs {
    productId: string,
    name: string;
    price: string;
    weight: string;
    size: string;
    image: string;
    count: string;
    // typeId: string;
  }
  
  @Table({ tableName: 'orderList', createdAt: false, updatedAt: false })
  export class OrderList extends Model<OrderList, OrderListCreationAttrs> {
    //для того, чтобы эти поля стали колонками в таблице их нужно пометить декоратором @Colum и указат опции
  
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true,})
    OrderListId: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    price: string;

    @Column({ type: DataType.STRING, allowNull: false })
    weight: string;

    @Column({ type: DataType.STRING , allowNull: false })
    size: string;

    @Column({ type: DataType.STRING , allowNull: false })
    image: string;

    @Column({ type: DataType.STRING , allowNull: false })
    count: string;

    // @Column({ type: DataType.STRING , allowNull: false })
    // typeId: string;


    @ForeignKey(() => Order)
    @Column({type: DataType.INTEGER})
    orderId: number;
  
    @BelongsTo(()=> Order)
    order: Order;

  }
  