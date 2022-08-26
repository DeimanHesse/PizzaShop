//с валидацией
// import {IsEmail, IsString, Length} from "class-validator";

import { createOrderListDto } from "./create-order-list.dto";

// export class CreateUserDto {

//     // валидация емэйла
//     @IsString({message: 'Должно быть строкой'})
//     @IsEmail({}, {message: "Некорректный email"})
//     readonly email: string;

//     //валидация пароля
//     @IsString({message: 'Должно быть строкой'})
//     @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
//     readonly password: string;
// }


//без валидации
export class createOrderDto {
    readonly name: string;
    readonly address: string;
    readonly status: string;
    readonly phoneNumber: string;
    readonly sum: string;
    readonly userId: string;
    readonly date: string;

}