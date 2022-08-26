import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

//в сервисе мы создаём класс, в котором есть функции для работы с базой и
//конструктор, в который импортируется модель
@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepisitory: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepisitory.create(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepisitory.findOne({where: {value}});
        return role;
    }
}
