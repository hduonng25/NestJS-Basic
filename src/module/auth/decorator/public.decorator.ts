import { SetMetadata } from '@nestjs/common';
import { KEY_DECORATOR } from '../constant';

export const Public = () => SetMetadata(KEY_DECORATOR.PUBLIC, true);
