import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { KEY_GUARD } from '../constant';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@Config/types';
import { Payload } from '@Utils/dto';
import { Request } from 'express';
import { BadReqException } from '@Utils/exceptions';

/**
 * PassportStrategy là một middleware nên là nó sẽ được gọi đến đầu tiên khi có Req truyền về
 * JwtStrategy kế thừa lại nên cũng có chức năng tương tự
 * Không cần phải khai báo như middleware bình thường nó sẽ hoạt động như một middleware theo cách NestJS và Passport phối hợp với nhau
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, KEY_GUARD.JWT_GLOBAL) {
    constructor(private readonly configService: ConfigService<AllConfigType>) {
        super({
            //Lấy token từ bearer của header có thể cấu hình khác và gọi đến
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true, //Neu dan false cac token het han se khong duoc decode, danh true thi nguoc lai
            secretOrKey: configService.getOrThrow('jwt.secret', { infer: true }),
        });
    }

    public async validate(payload: Payload, req: Request): Promise<Payload> {
        return payload;
    }
}
