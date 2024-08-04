export type TypeOrmConfigType = {
    connnect: boolean
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    seeds: string[];
    migrations: string[];
    logging: boolean;
    cli?: {
        entitiesDir: string;
        migrationsDir: string;
        subscribersDir: string;
    };
    synchronize: boolean;
    dropSchema: boolean;
    autoLoadEntities: boolean;
};
