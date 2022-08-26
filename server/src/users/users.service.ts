import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//мы также можем импортироать сюда другие сервисы
import { RolesService } from 'src/roles/roles.service';


import { CreateUserDto } from './dto/create-user.dto';
// import {User} from "./users.model";
// import { User } from './users.module';
import { User } from './users.model';


@Injectable() 
export class UsersService {
    constructor (@InjectModel(User) private userRepository: typeof User, 
     private roleService: RolesService
     ) {}

    async createUser (dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('user');
        // const role = await this.roleService.getRoleByValue('admin');
        //метод $set позволяет обновить какое-то поле и перезаписать его в бд
        //узнать подробнее
        await user.$set('roles', [role.id])
        user.roles = [role];
        return user;
    }

    async getAllUsers () {
        const users = await this.userRepository.findAll({include:{all:true}});
        return users;
    }

    async getUserByPhoneNumber(phoneNumber: string) {
        const user = await this.userRepository.findOne({where:{'phoneNumber': phoneNumber}, include:{all: true}})
        console.log('user', user)
        return user;
    } 
}
