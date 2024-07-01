import { HttpStatus } from '@nestjs/common';
import { ProductEntity } from '../entity';

export interface IResponseCreateProduct {
    message: string;
    newProduct: ProductEntity | Partial<ProductEntity>;
    status: HttpStatus;
}
