import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cartproduct } from 'src/carts/cartproduct.model';
import { Cart } from 'src/carts/carts.model';
import { FilesModule } from 'src/files/files.module';
import { ProductsController } from './products.controller';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Cart, Product, Cartproduct]),
    FilesModule
  ],
  exports: [
    ProductsService
  ]
})
export class ProductsModule {}
