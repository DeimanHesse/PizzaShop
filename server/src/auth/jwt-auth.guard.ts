import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    //суть этой функции в том, что когда она возвращает true, доступ разрешён, когда false, доступ запрещён
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //вытаскиваем объект запроса из контекста
        const req = context.switchToHttp().getRequest()
        try {

            //вытаскиваем хедер из authorization из тела запроса
            const authHeader = req.headers.authorization;

            //вытаскиваем из этого хедера отдельные части
            //тип токена
            const bearer = authHeader.split(' ')[0]
            //сам токен
            const token = authHeader.split(' ')[1]

            //делаем проверну: если тип токена не bearer или нет самого токена, пробрасываем ошибку
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            //если проверка прошла успешно, то мы должны раскодировать токен
            const user = this.jwtService.verify(token);
            req.user = user;

            //возвращаем из этой функции true
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }

}

//затем нам нужно добавить в экспорты аусмодуля authService и JwtModule - возможно пригодится