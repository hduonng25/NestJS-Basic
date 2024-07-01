import { ActionDeleteConstant } from '@Utils/constant';
import { Result } from '@Utils/result/type';
import { DeepPartial, FindOptionsWhere, QueryBuilder } from 'typeorm';

export interface TypeormInterfaceRepository<T> {
    create(dto: T | DeepPartial<T>): Promise<T>;

    update(id: string | any, dto: Partial<T> | T): Promise<T | Result>;

    findOne(params: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T>;

    find(params: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | T[]>;

    deleted(options: {
        id?: string;
        params?: FindOptionsWhere<T>;
        actions: ActionDeleteConstant;
    }): Promise<T | { message: string }>;

    queryBuilder(name: string, options: QueryBuilder<T>): Promise<T | any>;

    callProcedure(options: {
        pro_name: string;
        data?: Record<string, any>;
        param_number: number;
    }): Promise<any>;
}
