import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Success } from '@Utils/result';
import { Queue } from 'bull';
import { MongoAbstractService } from 'src/utils/designPattern/service/mongo';
import { DynamicService } from '../../dynamic/dynamic.service';
import { ElkService } from '../../elk/elk.service';
import { UserRepository } from './repository/user.repository';
import { UsersModel } from './schema';

@Injectable()
export class UserService extends MongoAbstractService<UsersModel> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly esService: ElkService,
        private readonly dynamicService: DynamicService,
        @InjectQueue('user') private readonly audioQueue: Queue,
    ) {
        super(userRepository);
        // this.esService.createIndex({
        //     index: UsersModel.name,
        //     propreties: {
        //
        //         name: { type: 'text' },
        //         email: { type: 'text' },
        //         address: { type: 'text' },
        //         role: { type: 'keyword' },
        //         password: { type: 'text' },
        //     },
        // });
    }

    /**
     * Demo chức năng bộ xử lý công việc(job processor)
     * Thường được sử dụng cho những tác vụ như gửi mail,... hoặc những tác vụ chưa cần xử lý ngay
     */
    public async demoQueue() {
        try {
            await this.audioQueue.add(
                'first',
                {
                    name: 'hduong',
                },
                { delay: 5000 },
            );
            return Success.ok('Demo queue');
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Sau khi gán dữ liệu ở UserModule và xử lý trong DynamicService
     * -> Gọi ra để kiểm tra
     */
    public demoDynamicModule() {
        return Success.ok(this.dynamicService.getOptions());
    }
}
