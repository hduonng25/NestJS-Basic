import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormRepository } from 'src/utils/designPattern/respository/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entity';

@Injectable()
export class ProductRepository extends TypeormRepository<ProductEntity> {
    constructor(@InjectRepository(ProductEntity) productEntity: Repository<ProductEntity>) {
        super(productEntity);
    }
}
