import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { createOrderListDto } from './dto/create-order-list.dto';
import { OrderList } from './order-list.model';

@Injectable()
export class OrderListService {
    constructor(@InjectModel(OrderList) private orderListRepository: typeof OrderList) {}

    async createOrderList(dto: createOrderListDto) {
        console.log('orderList', dto)
        const orderList = await this.orderListRepository.create(dto)
        return orderList;
    }

    // async getAllProducts () {                                  
    //     //находит все зависимые та
    //     const products = await this.productRepository.findAll({where: {'typeId':1}});
    //     return products;
    // }
    async getAllOrderLists () {                                  
        //находит все зависимые та
        const orderLists = await this.orderListRepository.findAll({include:{all:true}});
        return orderLists;
    }
}
