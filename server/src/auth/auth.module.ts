import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    //мы модуль авторизации используем внутри модуля юзера, а модуль юзера внутри модуля авторизации,
    //чтобы избежать этой круговой зависимости, нужно обернуть UserModule в forwardRef, а в user.module обернуть AuthModule
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      //время жизни токена
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
