//с валидацией
// import {IsEmail, IsString, Length} from "class-validator";

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
export class createTypeDto {
    readonly name: string;
   
}