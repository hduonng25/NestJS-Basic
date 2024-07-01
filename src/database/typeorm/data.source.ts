import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigOptions } from '@Config/typeorm.config';

export const dataSource: DataSource = new DataSource(TypeOrmConfigOptions as unknown as DataSourceOptions);
