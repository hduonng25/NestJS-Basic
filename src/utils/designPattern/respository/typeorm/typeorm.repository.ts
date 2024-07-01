import { ActionDeleteConstant } from '@Utils/constant';
import { BaseEntity } from '@Utils/entity';
import { TypeormInterfaceRepository } from '@Utils/designPattern/respository/typeorm/typeorm.interface.repository';
import { Errors } from '@Utils/result';
import { Result } from '@Utils/result/type';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

export class TypeormRepository<T extends BaseEntity> implements TypeormInterfaceRepository<T> {
    protected constructor(private readonly repository: Repository<T>) {}

    public async create(dto: T | DeepPartial<T>): Promise<T> {
        return await this.repository.save(dto);
    }

    public async findOne(params: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
        return await this.repository.findOneOrFail({ where: params });
    }

    public async find(params: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | T[]> {
        return await this.repository.find({ where: params });
    }

    public async deleted(options: {
        id?: string;
        params?: FindOptionsWhere<T>;
        actions: ActionDeleteConstant;
    }): Promise<T | { message: string }> {
        switch (options.actions) {
            case ActionDeleteConstant.SOFT:
                await this.repository.softDelete(options.id ? options.id : options.params);
                break;
            case ActionDeleteConstant.HASH:
                await this.repository.delete(options.id ? options.id : options.params);
                break;
            default:
                break;
        }

        return {
            message: 'Delete successfuly',
        };
    }

    public async update(id: any, dto: Partial<T> | T): Promise<T | Result> {
        const data: T = await this.repository.findOne({ where: { id } });

        if (!data) {
            return Errors.error({
                code: '',
                message: 'Data not found',
            });
        }

        Object.assign(data, dto);
        await this.repository.save(data);

        return data;
    }

    public async queryBuilder(alias: string): Promise<any> {
        return this.repository.createQueryBuilder(alias);
    }

    public async callProcedure(options: { pro_name: string; data?: Record<string, any> }): Promise<any> {
        const value: any[] = [];
        for (let i = 0; i < 4; i++) {
            switch (i) {
                case 0:
                    value.push(options.data);
                    break;
                default:
                    value.push(null);
                    break;
            }
        }

        const result = await this.repository.query(`call ${options.pro_name}(?, ?, ?, ?)`, value);
        return result[0];
    }
}
