import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import { TypeOrmConfigType } from './types/typeorm.config.type';

export const TypeOrmConfigOptions: TypeOrmConfigType = {
    connect: process.env.POSTGRES_CONNECT === 'true',
    type: process.env.TYPE_DB || 'postgres',
    host: process.env.HOST_DB,
    port: parseInt(process.env.PORT_DB),
    database: process.env.DATABASE_NAME,
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    dropSchema: process.env.DROPSCHEMA === 'true',
    synchronize: process.env.SYNCHRONIZE === 'true',
    entities: [`${process.env.ENTITIES}`],
    migrations: [`${__dirname}${process.env.MIGRATIONS}`],
    seeds: [`${__dirname}${process.env.SEEDS}`],
    logging: process.env.ENVIRONMENT === 'dev',
    autoLoadEntities: false,
    cli: {
        entitiesDir: process.env.ENTITIES_DIR,
        migrationsDir: process.env.MIGRATION_DIR,
        subscribersDir: process.env.SUBSCRIBER_DIR,
    },
};

export default registerAs('typeorm', (): TypeOrmConfigType => TypeOrmConfigOptions);
