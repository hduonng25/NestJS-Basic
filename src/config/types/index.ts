import { BullConfigType } from '@Config/types/bull.config.type';
import { ElasticSearchConfigType } from '@Config/types/elasticSearch.config.type';
import { FirebaseConfigType } from '@Config/types/firebase.config.type';
import { ThrottlerConfigType } from '@Config/types/throttler.config.type';
import { AdminJSConfigType } from './admin.config.type';
import { AppConfigType } from './app.config.type';
import { LoggerConfigType } from './logger.config.type';
import { MongoConfigType } from './mongo.config.type';
import { TypeOrmConfigType } from './typeorm.config.type';
import { JwtConfigType } from './jwt.config.type';

export * from './mongo.config.type';
export * from './app.config.type';
export * from './admin.config.type';
export * from './logger.config.type';
export * from './jwt.config.type';

export type AllConfigType = {
    app: AppConfigType;
    mongodb: MongoConfigType;
    adminjs: AdminJSConfigType;
    logger: LoggerConfigType;
    typeorm: TypeOrmConfigType;
    elasticSearch: ElasticSearchConfigType;
    throttler: ThrottlerConfigType;
    firebase: FirebaseConfigType;
    bull: BullConfigType;
    jwt: JwtConfigType
};
