import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createOrderListDto } from './dto/create-order-list.dto';
import { createOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService) {}

    @Post()
    createOrder (@Body() dto1: createOrderDto, 
    @Body('goods') dto2: createOrderListDto
    ) {
        return this.orderService.create(dto1, 
            dto2
            )
    }

    @UseGuards(JwtAuthGuard)
    @Get('/active')
        getActive() {
            return this.orderService.getActiveOrders();
        }

    @UseGuards(JwtAuthGuard)    
    @Get('/archive')
        getArchive() {
            return this.orderService.getArchiveOrders();
        }

    @UseGuards(JwtAuthGuard)    
    @Put(':id')
        patchOne(
            @Body('status') status: string,
            @Body('id') id: string,
            // @Param('id') id: string
            ) 
            {
            // console.log(id, status)
            return this.orderService.updateOneOrder(id, status);
        }  

    // @Delete()    
    // patchOne(
    //     @Body('status') status: string,
    //     @Body('id') id: string,
    //     // @Param('id') id: string
    //     ) 
    //     {
    //     // console.log(id, status)
    //     return this.orderService.deleteOneOrder(id, status);
    // }
      
    // @Get(':id')
    //     getOne(@Param('id') id: string) {
    //         return this.productService.getOneProduct(id);
    //     }      
}
