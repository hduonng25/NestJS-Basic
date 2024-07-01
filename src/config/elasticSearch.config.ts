import { ElasticSearchConfigType } from './types/elasticSearch.config.type';
import { registerAs } from '@nestjs/config';
import process from 'process';

export default registerAs<ElasticSearchConfigType>(
    'elasticSearch',
    (): ElasticSearchConfigType => ({
        node: process.env.ES_NODE,
        username: process.env.ES_USERNAME,
        password: process.env.ES_PASSWORD,
    }),
);
