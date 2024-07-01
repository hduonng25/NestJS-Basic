import * as mongoose from 'mongoose';
import { UserSchema, UsersModel } from '../../module/user/schema';
import { UserReourceOptions } from './adminjs.resource.options';

export const AdminJsResource = (database: typeof mongoose) => [
    {
        resource: database.model(UsersModel.name, UserSchema),
        options: UserReourceOptions,
    },
];
