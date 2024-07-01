import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(CreateUserDto, [
    'age',
    'name',
    'email',
    'address',
    'role',
] as const) {
    id: string;
}
