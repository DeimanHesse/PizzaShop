import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { CartsModule } from './carts/carts.module';
import { TypesModule } from './types/types.module';


import { ConfigModule } from "@nestjs/config";

import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from './products/products.model';
import { Cart } from './carts/carts.model';
import { Cartproduct } from './carts/cartproduct.model';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { Type } from './types/types.model';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { OrderListModule } from './order-list/order-list.module';
import { OrderListService } from './order-list/order-list.service';
import { OrdersService } from './orders/orders.service';
import { Order } from './orders/orders.model';
import { OrderList } from './order-list/order-list.model';
import { FilesModule } from './files/files.module';
import * as path from "path";
import { ServeStaticModule } from '@nestjs/serve-static';
console.log('dfdfdf', process.env.POSTGRES_HOST)

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`
      // envFilePath: `.env`
  }),
  ServeStaticModule.forRoot({
    rootPath: path.resolve(__dirname, 'static'),
  }),

  // SequelizeModule.forRoot({
  //     dialect: 'postgres',
  //     host: process.env.POSTGRES_HOST,
  //     port: Number(process.env.POSTGRES_PORT),
  //     username: process.env.POSTGRES_USER,
  //     // password: process.env.POSTGRES_PASSWORD,
  //     password: 'root',
  //     database: process.env.POSTGRES_DB,
  //     models: [User, Role, UserRoles, Product, Cart, Cartproduct, Type],
  //     autoLoadModels: true  //чтоы секвалайз сам создавал талицы на основании моделей
  // }),
  SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      // username: 'postgresnest',
      password: 'root',
      // password: 'root1234',
      database: 'nest_shop',
      //импортируем все модели
      models: [User, Role, UserRoles, Product, Cart, Cartproduct, Type, Order, OrderList],
      autoLoadModels: true  //чтоы секвалайз сам создавал талицы на основании моделей
  }),
    //импортируем модули
    UsersModule, 
    RolesModule, 
    ProductsModule, 
    CartsModule,
    TypesModule,
    AuthModule,
    OrdersModule,
    OrderListModule,
    FilesModule, 
  ],
  controllers: [AuthController],
  // controllers: [AppController],
  providers: [],
})
export class AppModule {}
