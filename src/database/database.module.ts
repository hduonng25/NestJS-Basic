import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { MongodbConnect } from './mongodb';
import { TypeormConnect } from './typeorm';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useClass: MongodbConnect,
        }),

        TypeOrmModule.forRootAsync({
            useClass: TypeormConnect,
            dataSourceFactory: async (options: DataSourceOptions) => {
                return new DataSource(options).initialize();
            },
        }),
    ],
    providers: [MongodbConnect, TypeormConnect],
})
export class DatabaseModule {}
