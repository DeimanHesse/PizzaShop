import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Cart } from './carts.model';
import { Product } from 'src/products/products.model';
import { Cartproduct } from './cartproduct.model';


@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [
    SequelizeModule.forFeature([User, Cart, Product, Cartproduct])
  ],
  exports: [
    CartsService
  ]
})
export class CartsModule {}
