import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { seconds, SkipThrottle, Throttle } from '@nestjs/throttler';
import { PaginationDto } from '@Utils/dto';
import { Success } from '@Utils/result';
import { Result } from '@Utils/result/type';
import { FindAllResponse } from '@Utils/types';
import { CreateUserDto } from './dto';
import { UsersModel } from './schema';
import { UserService } from './user.service';

@Controller({
    path: 'users',
    version: '1',
})
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * Sử dụng @SkipThrottle() để loại bỏ việc giới hạn số Req cho một router nhất định
     * @param pagination
     */
    @SkipThrottle()
    @Get()
    public async findAll(@Query() pagination: PaginationDto): Promise<Result> {
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

    @Get('queue')
    public async demoQueue() {
        return this.userService.demoQueue();
    }
}
