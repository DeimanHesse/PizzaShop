import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderList } from 'src/order-list/order-list.model';
import { createOrderListDto } from './dto/create-order-list.dto';
import { createOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';
import { OrderListService } from 'src/order-list/order-list.service';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order,
    private orderListService: OrderListService
    ) {}

    async create(dto1: createOrderDto, dto2: createOrderListDto) {
            console.log(dto1)
        const order = await this.orderRepository.create(dto1)
        // console.log('dataVal', id)
        const orderId = await order.getDataValue("id");
        // const orderName = await order.getDataValue("")
        // const orderValues = await order.getDataValue('Order');
        // const orderValues = await order.$get('o');
        // console.log('orderValue', orderValues)
        // console.log('orderNa', orderName)
        // const orderId = 
        await dto2[0].forEach(async (element) => {
            element.orderId = await orderId;
            console.log('el', element)
            await this.orderListService.createOrderList(element)
            return element;
        });

        // await dto2[0].map(async (element) => {
        //     element.orderId = await orderValues;
        //     console.log('el', element)
        //     await this.orderListService.createOrderList(element)
        //     return element;
        // });
       
        // await user.$set('roles', [role.id])
        // console.log('order2', order2)

        // const finalOrder: any = { goods: dto2[0] };
        // finalOrder = order;
        // finalOrder.goods = dto2[0];
        return order;
       
    }

    async getActiveOrders () {  
        //находит все зависимые та
        const orders = await this.orderRepository.findAll({
            where: {'status': ['accept', "inProcess", 'send']},
            // where: {'status': }
             include:{all:true}
            });
        return orders;
    }


    //именно из этих данных нужно проводить статистику
    async getArchiveOrders () {  
                                 
        //находит все зависимые та
        const orders = await this.orderRepository.findAll({
            where: {'status': "done"},
            // where: {'status': }
             include:{all:true}
            });
        return orders;
    }

    async updateOneOrder(id: string, status: string) {
        console.log('status',status)
        console.log('id', id)
        const order = await this.orderRepository.update({'status': status}, {where: {'id': `${id}`}, returning:true});
        // const order = await this.orderRepository.({where:{'id': id}});
        // console.log('updated order', order)
        return order;
    }
    // async getOneProduct(id: string) {
    //     const product = await this.productRepository.findOne({where: {'id':id}});
    //     return product;
    // }
 

    // async getAllPizzas () {                                  
    //     //находит все зависимые та
    //     const products = await this.productRepository.findAll({where: {'typeId':1}, include:{all:true}});
    //     return products;
    // }

    // async getAllDrinks () {                                  
    //     //находит все зависимые та
    //     const products = await this.productRepository.findAll({where: {'typeId':2}, include:{all:true}});
    //     return products;
    // }

    // async getAllDesserts () {                                  
    //     //находит все зависимые та
    //     const products = await this.productRepository.findAll({where: {'typeId':3}, include:{all:true}});
    //     return products;
    // }

    // async getAllSnacks () {                                  
    //     //находит все зависимые та
    //     const products = await this.productRepository.findAll({where: {'typeId':4}, include:{all:true}});
    //     return products;
    // }
}
