import { applyDecorators, SetMetadata } from '@nestjs/common';

export function Auth(...role: any[]) {
    return applyDecorators(SetMetadata('roles', role));
}
