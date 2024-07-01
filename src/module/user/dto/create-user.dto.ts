import { Optional } from '@nestjs/common';
import { RoleConstant } from '@Utils/constant';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @Optional()
    name: string;

    @Transform((value) => value.obj.age.split(', '))
    age: number;

    @Optional()
    email: string;

    @Optional()
    role: RoleConstant;

    @Optional()
    password: string;

    @Optional()
    address: string;
}
