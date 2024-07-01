import { MongoServiceInterface } from '@Utils/designPattern/service/mongo/mongo.interface.service';
import { AggregateOptions, FilterQuery, PipelineStage, ProjectionType, QueryOptions, Types } from 'mongoose';
import { PaginationDto } from '../../../dto';
import { BaseSchema } from '../../../schema';
import { MongoRepositoryInterface } from '../../respository/mongo';
import { FindAllResponse } from '../../../types';

export abstract class MongoAbstractService<T extends BaseSchema> implements MongoServiceInterface<T> {
    protected constructor(private readonly repository: MongoRepositoryInterface<T>) {}

    public async findAll(
        dto: PaginationDto,
        filter?: FilterQuery<T>,
        options?: QueryOptions<T>,
    ): Promise<FindAllResponse<T>> {
        return this.repository.findAll(dto, filter, options);
    }

    public async create(dto: Partial<T> | T): Promise<T> {
        return await this.repository.create(dto);
    }

    public async find(params: T | Partial<T>): Promise<T[] | T> {
        return await this.repository.find(params);
    }

    public async findOne(
        params: T | Partial<T>,
        projection?: ProjectionType<T> | null,
        options?: QueryOptions<T> | null,
    ): Promise<T> {
        return await this.repository.findOne(params, projection, options);
    }

    public async findOneById(id: string): Promise<T> {
        return await this.repository.findOneById(id);
    }

    public async update(
        id: string | Types.ObjectId,
        dto: Partial<T> | T,
        options?: QueryOptions<T> | null,
    ): Promise<T> {
        return await this.repository.update(id, dto, options);
    }

    public async hashDelete(id: string | Types.ObjectId): Promise<boolean> {
        return await this.repository.hashDelete(id);
    }

    public async softDelete(id: string): Promise<boolean> {
        return await this.repository.softDelete(id);
    }

    public async aggregate(pipeline: PipelineStage[], options?: AggregateOptions): Promise<any> {
        return await this.repository.aggregate(pipeline, options);
    }
}
