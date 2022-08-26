import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    //для того, чтобы создавать пользователя, нам понадобится
    //userService, поэтому заинжектим его сюда
constructor(private userService: UsersService,
            private jwtService: JwtService
    ) {}
   
   async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        // console.log('user', user)
        return this.generateToken(user);
    }

    
   async registration(userDto: CreateUserDto) {
       //нужно проверит ест ли ползовател с такими данными
       //поэтому в юзерсервисе создадим функцию getByEmail
       const candidate = await this.userService.getUserByPhoneNumber(userDto.phoneNumber)
        if (candidate) {
            throw new HttpException ('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
          
        //ecли ползовател с таким емэйлом не найден, нам неоходимо захешироват парол
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        //затем создаём пользователя, разворачивая дтошку и перезаписывая парол
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        //по итогу функци удет возвращат токен
        return this.generateToken(user)
    }

    //функция генерации токена
    private async generateToken(user: User) {
        //данные внутри токена
        const payload = {name: user.name, phoneNumber: user.phoneNumber, id: user.id, roles: user.roles}
        return {
            // из функции возвращаем токен
            token: this.jwtService.sign(payload)
            //выписать методы jwtService
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        // console.log('userDto', userDto)
        const user = await this.userService.getUserByPhoneNumber(userDto.phoneNumber);
        //затем нам необходимо проверить, совпадает ли пароль который пришёл с клиента с паролем в базе данных
        //первым параметром передаём пароль, который пришёл в дтошке, вторым, который пришёл из бд
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        //если юзер был найден и пароли совпадают, мы возврвшаем пользователя
        if (user.phoneNumber && passwordEquals) {
            console.log('user', user)
            return user;
        }
        //нестовская ошибка
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    
    }
}