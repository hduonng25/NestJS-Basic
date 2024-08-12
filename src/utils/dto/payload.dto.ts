import { RoleConstant } from '@Utils/constant';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class Payload {
    @IsString()
    _id: string;

    @IsString()
    _name: string;

    @IsEnum(RoleConstant)
    _role: string;

    @IsOptional()
    _expired?: any;
}
