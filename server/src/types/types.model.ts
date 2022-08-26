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
  
  
  //создаём интерфейс типизации для создания объекта из нашего класса
  interface TypeCreationAttrs {
    name: string;
}
  
  @Table({ tableName: 'types' })
  export class Type extends Model<Type, TypeCreationAttrs> {
    //для того, чтобы эти поля стали колонками в таблице их нужно пометить декоратором @Colum и указат опции
  
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true,})
    id: number;
  
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;
  
  //связь между таблицами
  //   @BelongsToMany(() => Role, () => UserRoles)
  //   roles: Role[];
  
    // связь с постами
    @HasMany(() => Product)
    products: Product[];
  }
  