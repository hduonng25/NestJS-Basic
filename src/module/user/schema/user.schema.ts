import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { RoleConstant } from '@Utils/constant';
import { BaseSchema } from '@Utils/schema';
import { NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

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

UserSchema.pre('save', async function save(next: NextFunction) {
    try {
        if (!this.isModified('password')) return next();

        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (error) {
        return next(error);
    }
});
