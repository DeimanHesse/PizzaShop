import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
// import { Cart } from 'src/carts/carts.model';
import { Cart } from '../carts/carts.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, Cart, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService,
    
  ]
})
export class UsersModule {}
