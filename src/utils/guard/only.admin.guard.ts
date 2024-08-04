import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { RoleConstant } from '@Utils/constant';
import { Observable } from 'rxjs';
import { UsersModel } from '../../module/user/schema';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user: Partial<UsersModel> | UsersModel = request.user;

        if (!user || user.role.includes(RoleConstant.ADMMIN)) {
            throw new ForbiddenException('You do not have permission to operate.');
        }

        return true;
    }
}
