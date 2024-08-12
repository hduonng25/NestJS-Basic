import { RoleConstant } from '@Utils/constant';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsOptional()
    name: string;

    // @Transform((value) => value.obj.age.split(', '))
    age: number;

    @IsOptional()
    email: string;

    @IsOptional()
    role: RoleConstant;

    @IsOptional()
    password: string;

    @IsOptional()
    address: string;
}
