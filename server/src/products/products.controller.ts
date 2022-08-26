import { Body, Controller, Get, Param, Post, Delete, Put, UsePipes, UploadedFile, UseInterceptors, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { createProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    // @UsePipes(ValidationPipe)
    @Post()
    //для работы с файлами
    @UseInterceptors(FileInterceptor('image'))
    createProduct (
        @Body() dto: createProductDto,
        @UploadedFile() image
        // @Body('description') descr: string,
        // @Body() Body
        
    ) {

        // console.log('description', typeof descr)
        // console.log('body',Body)
        return this.productService.create(dto, image)
    }

    @Get()
        getAll() {
            return this.productService.getAllProducts();
        }

    @Get('pizzas')
        getAllPizzas() {
           return this.productService.getAllPizzas();
        }        

    @Get('drinks')
        getAllDrinks() {
            return this.productService.getAllDrinks();
        }       

    @Get('desserts')
        getAllDesserts() {
           return this.productService.getAllDesserts();
        }     

    @Get('snacks')
        getAllSnacks() {
            return this.productService.getAllSnacks();
        }        

    @Get(':id')
        getOne(@Param('id') id: string) {
            return this.productService.getOneProduct(id);
        }

    @Delete(':id')    
        deleteOneProduct(
            // @Body('id') id: string,
            @Param('id') id: string
            ) 
            {
            console.log(id)
            return this.productService.deleteOneProduct(id);
        }   

    @Patch(':id')
        
    // @Put(':id')
        patchOne(
            @Body('name') name: string,
            @Body('price') price: string,
            @Body('image') image: string,
            @Body('size') size: number,
            @Body('weight') weight: string,
            @Body('description') description: string,
            @Param('id') id: string
            ) 
            {
            // console.log(id, status)
            return this.productService.updateOneProduct(id, name, price, image,
                size, weight, description);
        }       
        

}
