import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { AllConfigType } from '@Config/types';

@Injectable()
export class MongodbConnect implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService<AllConfigType>) {}

    createMongooseOptions(): MongooseModuleOptions {
        try {
            return {
                uri: this.configService.getOrThrow('mongodb.uri', {
                    infer: true,
                }),
            };
        } catch (err) {
            Logger.error('Connect to mongodb failed', err);
            throw Error(err.message);
        }
    }
}
