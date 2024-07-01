import { Injectable } from '@nestjs/common';
import { Success } from '@Utils/result';
import { Result } from '@Utils/result/type';
import { TypeormAbstractService } from 'src/utils/designPattern/service/typeorm';
import { SelectQueryBuilder } from 'typeorm';
import { CreateProductDto } from './dto';
import { ProductEntity } from './entity';
import { IResponseCreateProduct } from './interface';
import { ProductServiceInterface } from './product.service.interface';
import { ProductRepository } from './repository';

@Injectable()
export class ProductService extends TypeormAbstractService<ProductEntity> implements ProductServiceInterface {
    constructor(private readonly productRepository: ProductRepository) {
        super(productRepository);
    }

    public async demoQueryBuilder(): Promise<Result> {
        const queryBuilder: SelectQueryBuilder<ProductEntity> =
            await this.productRepository.queryBuilder('Products');
        return Success.ok(await queryBuilder.getMany());
    }

    public async createProduct(createProductDto: CreateProductDto) {
        const data: IResponseCreateProduct = await this.productRepository.callProcedure({
            pro_name: 'pro_create_product',
            data: createProductDto,
        });

        return Success.create(data.newProduct, data.status, data.message);
    }

    public async createDetails(): Promise<Result> {
        console.log('hduong');
        return;
    }
}
