import { AggregateOptions, FilterQuery, PipelineStage, ProjectionType, QueryOptions, Types } from 'mongoose';
import { PaginationDto } from '@Utils/dto';
import { FindAllResponse } from '@Utils/types';

export interface MongoRepositoryInterface<T> {
    create(dto: T | Partial<T>): Promise<T>;

    findOne(
        params: T | Partial<T>,
        projection?: ProjectionType<T> | null,
        options?: QueryOptions<T> | null,
    ): Promise<T>;

    find(params: T | Partial<T>): Promise<T | T[]>;

    findOneById(id: string, projection?: QueryOptions<T>): Promise<T>;

    findOneByCondition(condition: FilterQuery<T>, projection?: QueryOptions<T>): Promise<T>;

    findAll(
        pagination: PaginationDto,
        condition?: FilterQuery<T>,
        options?: QueryOptions<T>,
    ): Promise<FindAllResponse<T>>;

    update(id: string | Types.ObjectId, dto: T | Partial<T>, options?: QueryOptions<T> | null): Promise<T>;

    softDelete(id: string): Promise<boolean>;

    hashDelete(id: string | Types.ObjectId): Promise<boolean>;

    aggregate(pipeline: PipelineStage[], options?: AggregateOptions): Promise<any | T[]>;
}
