import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './carts.model';
import { createCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
    constructor(@InjectModel(Cart) private cartRepisitory: typeof Cart) {}

    async createRole(dto: createCartDto) {
        const cart = await this.cartRepisitory.create(dto);
        return cart;
    }

    // async getRoleByValue(value: string) {
    //     const role = await this.roleRepisitory.findOne({where: {value}});
    //     return role;
    // }
}
