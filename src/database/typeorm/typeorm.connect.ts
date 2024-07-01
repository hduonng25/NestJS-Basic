import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from '@Config/types';

@Injectable()
export class TypeormConnect implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService<AllConfigType>) {}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return this.configService.getOrThrow('typeorm', {
            infer: true,
        }) as TypeOrmModuleOptions;
    }
}
