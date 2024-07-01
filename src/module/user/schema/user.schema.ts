import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { RoleConstant } from '@Utils/constant';
import { BaseSchema } from '@Utils/schema';

export type UserDocument = mongoose.HydratedDocument<UsersModel>;

@Schema({ collection: 'users' })
export class UsersModel extends BaseSchema {
    @Prop({ type: 'string', required: false })
    name: string;

    @Prop({ type: 'string', required: false })
    email: string;

    @Prop({ type: 'string', required: false })
    address: string;

    @Prop({ type: 'string', required: false })
    role: RoleConstant;

    @Prop({ type: String, required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(UsersModel);
