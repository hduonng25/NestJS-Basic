import { ActionDeleteConstant } from '@Utils/constant';
import { Result } from '@Utils/result/type';
import { DeepPartial, FindOptionsWhere } from 'typeorm';

export interface Write<T> {
    create(dto: T | DeepPartial<T>): Promise<T>;

    update(id: string | any, dto: Partial<T> | T): Promise<T | Result>;

    delete(options: {
        id?: string;
        params?: FindOptionsWhere<T>;
        actions: ActionDeleteConstant;
    }): Promise<T | { message: string }>;
}

export interface Read<T> {
    find(params: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | T[]>;

    findOne(params: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T>;
}

export interface TypeOrmServiceInterface<T> extends Write<T>, Read<T> {}
