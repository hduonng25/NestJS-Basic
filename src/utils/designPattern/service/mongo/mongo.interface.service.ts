import { AggregateOptions, FilterQuery, PipelineStage, ProjectionType, QueryOptions, Types } from 'mongoose';
import { PaginationDto } from '../../../dto';
import { FindAllResponse } from '../../../types';

export interface Write<T> {
    create(dto: T | Partial<T>): Promise<T>;

    update(id: string | Types.ObjectId, dto: Partial<T> | T, options?: QueryOptions<T> | null): Promise<T>;

    softDelete(id: string): Promise<boolean>;

    hashDelete(id: string | Types.ObjectId): Promise<boolean>;
}

export interface Read<T> {
    findAll(
        dto: PaginationDto,
        filter?: FilterQuery<T>,
        options?: QueryOptions<T>,
    ): Promise<FindAllResponse<T>>;

    find(params: T): Promise<T | T[]>;

    findOne(
        params: T | Partial<T>,
        projection?: ProjectionType<T> | null,
        options?: QueryOptions<T> | null,
    ): Promise<T>;

    findOneById(id: string): Promise<T>;

    aggregate(pipeline: PipelineStage[], options?: AggregateOptions): Promise<any | T[]>;
}

export interface MongoServiceInterface<T> extends Write<T>, Read<T> {}
