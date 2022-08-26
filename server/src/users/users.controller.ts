import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Request } from 'express'

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    //в пост-запросы нужно доавлт декоратор @Body, так как он даёт раотат с телом запроса
    create(@Body() userDto: CreateUserDto, 
   @Body() Body
    ) {
        console.log('body', Body)
        // console.log('req', req.body)
        console.log('userDto', userDto )
        //userDto мы получаем в теле запроса
        return this.userService.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }
}
