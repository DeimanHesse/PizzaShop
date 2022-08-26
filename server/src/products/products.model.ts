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
import { Cartproduct } from 'src/carts/cartproduct.model';
import { Cart } from 'src/carts/carts.model';
import { Type } from 'src/types/types.model';
  
  
  //создаём интерфейс типизации для создания объекта из нашего класса
  interface ProductCreationAttrs {
    name: string;
    description: string;
    price: number;
    weight: string;
    size: number;
    image: string;
  }
  
  @Table({ tableName: 'products' })
  export class Product extends Model<Product, ProductCreationAttrs> {
    //для того, чтобы эти поля стали колонками в таблице их нужно пометить декоратором @Colum и указат опции
  
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true,})
    id: number;
  
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    description: string;
  
    @Column({ type: DataType.INTEGER, allowNull: true })
    price: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    weight: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    size: number;

    @Column({ type: DataType.STRING, allowNull: false })
    image: string;
  

    @ForeignKey(() => Type)
    @Column({type: DataType.INTEGER})
    typeId: number;
  
    
  
    //связь между таблицами
    @BelongsToMany(() => Cart, () => Cartproduct)
    carts: Cart[];
  
    //связь с постами
  //   @HasMany(() => Post)
  //   posts: Post[];
  }
  