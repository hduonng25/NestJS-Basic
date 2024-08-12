import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport';

@Module({
    imports: [
        PassportModule,
        UserModule,
        ConfigModule,
        JwtModule.register({}),
    ],
    providers: [AuthService, JwtStrategy, ConfigService],
    controllers: [AuthController],
})
export class AuthModule {}
