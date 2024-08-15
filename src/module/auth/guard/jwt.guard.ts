import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { KEY_DECORATOR, KEY_GUARD } from '../constant';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Payload } from '@Utils/dto';
import { BadReqException } from '@Utils/exceptions';

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

        return super.canActivate(context);
    }

    handleRequest<Payload>(_: any, user: Payload): Payload {
        //Phương thức này sẽ kiểm tra xem req có hợp lệ hay không (thời gian hiệu lực, ...)
        this.checkUserLogin(user);
        return user;
    }

    private checkUserLogin(payload: Payload | Partial<Payload>): void {
        if (!payload) {
            throw new BadReqException('Token khong hop le');
        }

        const now: number = Date.now();
        const expiredToken: number = payload?._expired;

        if (now > expiredToken) {
            throw new BadReqException('Token da het han');
        }
    }
}
