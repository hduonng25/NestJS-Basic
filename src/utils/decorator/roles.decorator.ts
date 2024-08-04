import { applyDecorators, SetMetadata } from '@nestjs/common';

export function RolesAccep(...role: any[]) {
    return applyDecorators(SetMetadata('roles', role));
}
