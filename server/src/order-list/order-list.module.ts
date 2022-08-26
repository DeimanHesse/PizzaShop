import { forwardRef, Module } from '@nestjs/common';
import { OrderListController } from './order-list.controller';
import { OrderList } from './order-list.model';
import { OrderListService } from './order-list.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/orders/orders.model';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  controllers: [OrderListController],
  providers: [OrderListService],
  imports: [
    SequelizeModule.forFeature([OrderList, Order,
      // Product, 
      // Cartproduct
      
    ]),
    // forwardRef(() => OrdersModule),
    
    // OrdersModule
  ],
  exports: [
    OrderListService,

  ]
})
export class OrderListModule {}
