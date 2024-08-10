import { SetMetadata } from '@nestjs/common';
import { KEY_DECORATOR } from 'src/module/auth/constant';

export const RolesAccept = (...role: any[]) => SetMetadata(KEY_DECORATOR.ROLES, role);
