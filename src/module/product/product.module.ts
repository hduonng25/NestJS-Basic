import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    providers: [ProductService, ProductRepository],
    controllers: [ProductController],
})
export class ProductModule {}
