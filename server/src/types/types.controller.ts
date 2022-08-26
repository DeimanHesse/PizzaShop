import { Body, Controller, Get, Post } from '@nestjs/common';
import { createTypeDto } from './dto/create-type.dto';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
    constructor(private typeService: TypesService) {}
    
    @Post()
        //в пост-запросы нужно доавлт декоратор @Body, так как он даёт раотат с телом запроса
        create(@Body() typeDto: createTypeDto, 
        // @Req() req: Request
        ) {
            
            //userDto мы получаем в теле запроса
            return this.typeService.createType(typeDto);
        }
    
        @Get()
        getAll() {
            return this.typeService.getAllTypes();
        }

}
