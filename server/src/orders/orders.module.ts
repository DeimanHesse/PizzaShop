import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './orders.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderList } from 'src/order-list/order-list.model';
import { OrderListService } from 'src/order-list/order-list.service';
import { OrderListModule } from 'src/order-list/order-list.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([Order, OrderList,
      // Product, 
      // Cartproduct
      // forwardRef(() => OrderListModule)
    ]),
    // OrderListService,
    // OrderListModule,
    // forwardRef(() => OrderListModule),
    OrderListModule,
    AuthModule
    
  ],
  exports: [
    OrdersService
  ]
})
export class OrdersModule {}
