import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersModel } from '../../module/user/schema';

type UserProperties = keyof UsersModel;

export const UserLogin = createParamDecorator((data: UserProperties, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});
