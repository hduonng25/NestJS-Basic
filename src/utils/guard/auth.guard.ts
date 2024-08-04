import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersModel } from '../../module/user/schema';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roleInDecoractor: string[] = this.reflector.get<string[]>('roles', context.getHandler());

        const request = context.switchToHttp().getRequest();

        const user: Partial<UsersModel> = request.user;

        if (!user || !roleInDecoractor) return true;

        if (!roleInDecoractor.includes('user')) {
            throw new ForbiddenException('You do not have permission to operate.');
        }

        return true;
    }
}
