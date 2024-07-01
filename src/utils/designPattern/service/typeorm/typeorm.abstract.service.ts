import { ActionDeleteConstant } from '@Utils/constant';
import { BaseEntity } from '@Utils/entity';
import { TypeormRepository } from 'src/utils/designPattern/respository/typeorm';
import { Result } from '@Utils/result/type';
import { TypeOrmServiceInterface } from '@Utils/designPattern/service/typeorm/typeorm.interface.service';
import { DeepPartial, FindOptionsWhere } from 'typeorm';

export abstract class TypeormAbstractService<T extends BaseEntity> implements TypeOrmServiceInterface<T> {
    protected constructor(private readonly repository: TypeormRepository<T>) {}

    public async create(dto: DeepPartial<T> | T): Promise<T> {
        return await this.repository.create(dto);
    }

    public async delete(options: {
        id?: string;
        params?: FindOptionsWhere<T>;
        actions: ActionDeleteConstant;
    }): Promise<T | { message: string }> {
        return this.repository.deleted(options);
    }

    public async find(params: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[] | T> {
        return this.repository.find(params);
    }

    public async findOne(params: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
        return this.repository.findOne(params);
    }

    public async update(id: string | any, dto: Partial<T> | T): Promise<T | Result> {
        return this.repository.update(id, dto);
    }
}
