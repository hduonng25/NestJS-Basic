import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, [
    'age',
    'name',
    'email',
    'address',
    'role',
] as const) {
    @IsOptional()
    id: string;
}
