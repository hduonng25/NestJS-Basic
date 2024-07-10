import { applyDecorators, SetMetadata } from '@nestjs/common';

export function AuthDecorator(...role: any[]) {
    return applyDecorators(SetMetadata('roles', role));
}
