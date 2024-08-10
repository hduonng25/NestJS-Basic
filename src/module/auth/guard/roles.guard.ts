import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersModel } from 'src/module/user/schema';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roleInDecorator: string[] = this.reflector.get<string[]>('roles', context.getHandler());

        const request = context.switchToHttp().getRequest();

        const user: Partial<UsersModel> = request.user;

        if (!user || !roleInDecorator) return true;

        if (!roleInDecorator.includes(user.role)) {
            throw new ForbiddenException('You do not have permission to operate.');
        }

        return true;
    }
}
