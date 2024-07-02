import { DynamicModule, Module } from '@nestjs/common';
import { DynamicService } from './dynamic.service';

/**
 * Module động
 * Nhận vào options
 * Khởi tạo Provider
 *      - OPTIONS -> Token để sử dụng trong @Inject('Token')
 *      - useValue -> Gán giá trị của options nhận vào cho Token để inject và sử dụng trong service
 *
 * Xem khởi tạo và truyền dữ liệu trong user module
 */
@Module({})
export class DynamicModules {
    public static register(options: { someOptions: string }): DynamicModule {
        return {
            module: DynamicModules,
            providers: [
                DynamicService,
                {
                    provide: 'OPTIONS',
                    useValue: options,
                },
            ],
            exports: [DynamicService],
        };
    }
}
