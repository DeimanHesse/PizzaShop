import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
    AllowNull,
    HasMany,
    ForeignKey,
  } from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { Cart } from './carts.model';
  
  
  //создаём интерфейс типизации для создания объекта из нашего класса
  interface CartproductCreationAttrs {
    productId: string;
  }
  
  @Table({ tableName: 'cartproduct' })
  export class Cartproduct extends Model<Cartproduct, CartproductCreationAttrs> {
    //для того, чтобы эти поля стали колонками в таблице их нужно пометить декоратором @Colum и указат опции
  
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true,})
    id: number;
  
 
  
   
  
    @ForeignKey(() => Cart)
    @Column({type: DataType.INTEGER})
    cartId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;
  
    
  
    //связь между таблицами
  //   @BelongsToMany(() => Role, () => UserRoles)
  //   roles: Role[];
  
    //связь с постами
  //   @HasMany(() => Post)
  //   posts: Post[];
  }
  