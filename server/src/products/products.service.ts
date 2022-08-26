import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { createProductDto } from './dto/create-product.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product) private productRepository: typeof Product,
                                      private fileService: FilesService  ) {}

    async create(dto: createProductDto, image: any) {
        console.log('description',dto)

        //вызываем у fileService метод createFile, который вернёт нам строкой название файла
        const fileName =  await this.fileService.createFile(image);
        console.log('filena', fileName);
        const product = await this.productRepository.create({...dto, image: fileName})
        return product;
    }

    //UPDATE

    async updateOneProduct(id: string, name: string, price: string, image: any,
        size: number, weight: string, description: string) {
        console.log('id', id)
        console.log('name', name)
        console.log('price', price)
        console.log('image', image)
        console.log('size', size)
        console.log('weight', weight)
        console.log('weight', weight)
        if (typeof image === 'string' ) {
           console.log(image)
           const product = await this.productRepository.update({
            'name': name,
            'price': price,
            'weight': weight,
            'size': size,
            'image': image,
            'description': description,
            }, {where: {'id': `${id}`}, returning: true}); //returning: true - возвращает обновлённый объект из та
            return product;
        }  else {
            const fileName =  await this.fileService.createFile(image);

            const productId = await this.productRepository. update({
                'name': name,
                'price': price,
                'weight': weight,
                'size': size,
                'image': fileName,
                'description': description,
                }, {where: {'id': `${id}`}});

                console.log('productId', typeof productId[0])

                const product = await this.productRepository.findOne({where: {'id': productId[0]}});
                console.log('product', product)
                return product;
        }   
   
    }

    async getAllProducts () {                                  
        //находит все зависимые та
        const products = await this.productRepository.findAll({include:{all:true}});
        return products;
    }

    async getOneProduct(id: string) {
        const product = await this.productRepository.findOne({where: {'id':id}});
        return product;
    }
 
    //GET ALL

    async getAllPizzas () {                                  
        //находит все зависимые та
        const products = await this.productRepository.findAll({where: {'typeId':1}, include:{all:true}});
        return products;
    }

    async getAllDrinks () {                                  
        //находит все зависимые та
        const products = await this.productRepository.findAll({where: {'typeId':2}, include:{all:true}, order:['id']});
        return products;
    }

    async getAllSnacks () {                                  
        //находит все зависимые та
        const products = await this.productRepository.findAll({where: {'typeId':3}, include:{all:true}});
        return products;
    }

    async getAllDesserts () {                                  
        //находит все зависимые та
        const products = await this.productRepository.findAll({where: {'typeId':4}, include:{all:true}});
        return products;
    }

    //DELETE

    async deleteOneProduct (id: string) {                                  
        //находит все зависимые та
        const product = await this.productRepository.destroy({where: {'id':id}});
        return product;
    }

    
}
