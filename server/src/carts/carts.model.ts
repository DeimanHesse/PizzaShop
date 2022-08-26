import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
    AllowNull,
    HasMany,
  } from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { Cartproduct } from './cartproduct.model';
  
  
  //создаём интерфейс типизации для создания объекта из нашего класса
  interface CartCreationAttrs {
    name: string;
    userId: string;
  }
  
  @Table({ tableName: 'carts' })
  export class Cart extends Model<Cart, CartCreationAttrs> {
    //для того, чтобы эти поля стали колонками в таблице их нужно пометить декоратором @Colum и указат опции
  
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true,})
    id: number;
  
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    userId: string;
  
   
  
    
  
    
  
    //связь между таблицами
    @BelongsToMany(() => Product, () => Cartproduct)
    products: Product[];
  
    //связь с постами
  //   @HasMany(() => Post)
  //   posts: Post[];
  }
  