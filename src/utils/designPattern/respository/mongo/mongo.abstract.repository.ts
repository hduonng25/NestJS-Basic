import {
    AggregateOptions,
    FilterQuery,
    Model,
    PipelineStage,
    ProjectionFields,
    ProjectionType,
    QueryOptions,
    Types,
} from 'mongoose';
import { PaginationDto } from '../../../dto';
import { BaseSchema } from '../../../schema';
import { FindAllResponse } from '../../../types';
import { MongoRepositoryInterface } from './mongo.repository.interface';

export abstract class MongoAbstractRepository<T extends BaseSchema> implements MongoRepositoryInterface<T> {
    /**
     * protected nhằm chỉ định sử dụng super để khởi tạo constructor ở các lớp trừu tượng
     * @param model
     * @protected
     */
    protected constructor(private readonly model: Model<T>) {
        this.model = model;
    }

    public async create(dto: T | Partial<T>): Promise<T> {
        return await this.model.create(dto);
    }

    public async findOneByCondition(condition: FilterQuery<T>, projection?: QueryOptions<T>): Promise<T> {
        return await this.model.findOne({ ...condition }, projection ? { ...projection } : {}).exec();
    }

    public async findOneById(id: string, projection?: QueryOptions<T>): Promise<T> {
        return this.model.findById(id, projection ? { ...projection } : {});
    }

    public async update(
        id: string | Types.ObjectId,
        dto: T | Partial<T>,
        options?: QueryOptions<T> | null,
    ): Promise<T> {
        return this.model.findOneAndUpdate({ _id: id }, dto, options);
    }

    public async findAll(
        pagination: PaginationDto,
        condition: FilterQuery<T>,
        options?: QueryOptions<T>,
    ): Promise<FindAllResponse<T>> {
        const skip: number = (pagination.page - 1) * pagination.skip;

        const pipeline: PipelineStage[] = [
            { $match: condition ?? { deletedDate: null } },
            { $skip: skip },
            { $limit: pagination.size },
            ...(options?.projection ? [{ $project: options.projection as ProjectionFields<T> }] : []),
            ...(options?.sort ? [{ $sort: options.sort }] : []),
        ];

        const [count, item] = await Promise.all([
            await this.model.countDocuments({ ...condition }),
            await this.model.aggregate(pipeline),
        ]);

        const totalPage: number = Math.ceil(count / Number(pagination.size));

        return {
            page: Number(pagination.page),
            count,
            totalPage,
            data: item,
        };
    }

    public async hashDelete(id: string | Types.ObjectId): Promise<boolean> {
        const check = await this.model.findById(id);
        if (!check) return false;
        return !!(await this.model.deleteOne({ _id: id }));
    }

    public async softDelete(id: string): Promise<boolean> {
        const check = await this.model.findById(id);
        if (!check) return false;
        return !!(await this.model.findOneAndUpdate({
            _id: id,
            deletedDate: new Date(),
        }));
    }

    public async find(params: T | Partial<T>): Promise<T | T[]> {
        return this.model.find(params);
    }

    public async findOne(
        params: T | Partial<T>,
        projection?: ProjectionType<T> | null,
        options?: QueryOptions<T> | null,
    ): Promise<T> {
        return this.model.findOne({ ...params }, projection, options);
    }

    public async aggregate(pipeline: PipelineStage[], options?: AggregateOptions): Promise<any | T[]> {
        return this.model.aggregate(pipeline, options ? options : {});
    }
}
