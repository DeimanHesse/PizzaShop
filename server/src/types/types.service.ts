import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createTypeDto } from './dto/create-type.dto';
import { Type } from './types.model';

@Injectable()
export class TypesService {
    constructor (@InjectModel(Type) private typeRepository: typeof Type,
    // private roleService: RolesService
    ) {}

    async createType (dto: createTypeDto):Promise<Type> {
        const type = await this.typeRepository.create(dto);
        return type;
    }

    async getAllTypes () {                                  
        //находит все зависимые та
        const types = await this.typeRepository.findAll({include:{all:true}});
        // const types = await this.typeRepository.;
        return types;
    }
}
