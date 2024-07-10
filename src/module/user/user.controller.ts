import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { seconds, SkipThrottle, Throttle } from '@nestjs/throttler';
import { PaginationDto } from '@Utils/dto';
import { BadReqException } from 'src/utils/exceptions';
import { Success } from '@Utils/result';
import { Result } from '@Utils/result/type';
import { FindAllResponse } from '@Utils/types';
import { CreateUserDto } from './dto';
import { UsersModel } from './schema';
import { UserService } from './user.service';
import { Request } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthDecorator, UserLogin } from '@Utils/decorator';

@Controller({
    path: 'users',
    version: '1',
})
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * Sử dụng @SkipThrottle() để loại bỏ việc giới hạn số Req cho một router nhất định
     * @param pagination
     * @param req
     * @param i18n
     */
    @SkipThrottle()
    @Get()
    public async findAll(
        @Query() pagination: PaginationDto,
        @Req() req: Request,
        @I18n() i18n: I18nContext,
    ): Promise<Result> {
        console.log(await i18n.t('common.demo'));

        const data: FindAllResponse<UsersModel> = await this.userService.findAll(
            pagination,
            {},
            { projection: { password: 0 } },
        );
        return Success.ok(data);
    }

    /**
     *  @Throttle({ default: { limit: 6, ttl: seconds(6) } }) hoặc sử dụng như này để cấu hình throttler cho 1 router
     * @param body
     */
    @Throttle({ default: { limit: 6, ttl: seconds(6) } })
    @Post()
    public async create(@Body() body: CreateUserDto) {
        const data: UsersModel = await this.userService.create(body);

        if (!data) throw new BadReqException('Create faild');

        return Success.create(data);
    }

    /**
     * Sử dụng Cron để chỉ định rằng đúng thời gian được cấu hình sẽ thực thi hàm này
     */
    // @Cron(CronExpression.EVERY_5_SECONDS)
    // @Put()
    // public async demoCron() {
    //     console.log('Cron 5 second');
    //     return Success.ok('hduong');
    // }

    /**
     * Demo queue
     */
    @Get('queue')
    public async demoQueue() {
        return this.userService.demoQueue();
    }

    /**
     * Demo dynamic
     */
    @Get('dynamic')
    public async demoDynamic(@UserLogin() user: UsersModel) {
        console.log(user.name);
        return this.userService.demoDynamicModule();
    }

    /**
     * SetMetadata => Là một hàm trong NestJS để gán metadata(siêu dữ liệu) tuỳ chỉnh cho các thành phần như controller, service,...
     * Metadata được set sẽ được sử dụng sau đó bởi Guard, Interceptor, Filter,...
     * SetMetadata sẽ trả ra một Decoractor => Việc sử dụng SetMetadata giống như việc sử dụng Decoractor nhưng nó linh hoạt hơn
     *      - Tham số đầu tiên là Key(Có thể hiểu như là tên của Decorator)
     *      - Tham số phía sau là Value
     *      - Thường được sử dụng chung với Guard để phân, check quyền truy cập
     */
    @AuthDecorator('admin', 'user')
    @Get('demo-metadata')
    public async demoMetadata() {
        console.log("demo metadata");
    }
}
