import { Body, Controller, Get, Post } from '@nestjs/common';
import { createOrderListDto } from './dto/create-order-list.dto';
import { OrderListService } from './order-list.service';

@Controller('order-list')
export class OrderListController {
    constructor(private orderListService: OrderListService) {}

    @Post()
    createOrderList (@Body() dto: createOrderListDto) {
        return this.orderListService.createOrderList(dto)
    }

    @Get()
        getAll() {
            return this.orderListService.getAllOrderLists();
        }
}
