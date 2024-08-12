import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { KEY_DECORATOR, KEY_GUARD } from '../constant';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

/**
 * Class này được sử dụng để xác thực cũng như bảo vệ ứng dụng
 * AuthGuard('jwt') chỉ định Guard này sẽ sử dụng chiến lược 'jwt' được cấu hình trong ứng dụng
 * Phương thức canActive => Phương thức này sẽ xác nhận xem req có vào được route hay không
 * Phương thức handleRequest => Phương thức này sẽ xử lý kết quả xác thực
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(KEY_GUARD.JWT_GLOBAL) {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //Phương thức này sẽ kiểm tra xem trong req có token hay không
        //Nếu có sẽ cho qua và chạy đến handleRequest để kiểm tra token có hợp lệ hay không
        const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(KEY_DECORATOR.PUBLIC, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const request: Request = context.switchToHttp().getRequest();
        const token: string = this.extractTokenFromHeader(request);

        if (!token) return false;

        return super.canActivate(context);
    }

    handleRequest<TUser = any>(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
        status?: any,
    ): TUser {
        //Phương thức này sẽ kiểm tra xem req có hợp lệ hay không (thời gian hiệu lực, ...)
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
