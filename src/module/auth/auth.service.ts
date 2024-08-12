import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LogInDto } from './dto';
import { Errors, Success } from '@Utils/result';
import { Result } from '@Utils/result/type';
import { UsersModel } from '../user/schema';
import { Payload } from '@Utils/dto';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@Config/types';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService<AllConfigType>,
    ) {} //TODO: Implement constructor

    private async getToken(
        payload: Payload,
        isRefresh: boolean = true,
    ): Promise<{ _accessToken: string; _refreshToken?: string | undefined }> {
        const now: number = new Date().getTime();
        const tokenExpires: number =
            now + this.configService.getOrThrow('jwt.accessTokenExpired', { infer: true }) * 1000;
        const refreshTokenExpires: number =
            now + this.configService.getOrThrow('jwt.refreshTokenExpired', { infer: true }) * 1000;

        const [_accessToken, _refreshToken] = await Promise.all([
            //Token
            await this.jwtService.signAsync(
                {
                    ...payload,
                    _expired: tokenExpires,
                } as Payload,
                {
                    secret: this.configService.getOrThrow('jwt.secret', { infer: true }),
                    expiresIn: tokenExpires,
                },
            ),

            //Refresh token
            !isRefresh
                ? undefined
                : await this.jwtService.signAsync(
                      {
                          id: payload._id,
                          _expired: refreshTokenExpires,
                      } as Partial<Payload>,
                      {
                          secret: this.configService.getOrThrow('jwt.refresh', { infer: true }),
                          expiresIn: refreshTokenExpires,
                      },
                  ),
        ]);

        return {
            _accessToken,
            _refreshToken,
        };
    }

    public async signIn(params: LogInDto): Promise<Result | any> {
        const user: UsersModel = await this.userService.findOne({ email: params.username });

        if (!user)
            return Errors.error({
                code: '',
                message: 'User not found',
            });

        const payload: Payload = {
            _id: user._id,
            _name: user.name,
            _role: user.role,
        };

        return Success.ok(await this.getToken(payload));
    }
}
