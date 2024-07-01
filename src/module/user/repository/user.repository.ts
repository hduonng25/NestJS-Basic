import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoAbstractRepository } from 'src/utils/designPattern/respository/mongo';
import { UsersModel } from '../schema';
import { UserReposititoryInterface } from './interface.repository';

@Injectable()
export class UserRepository extends MongoAbstractRepository<UsersModel> implements UserReposititoryInterface {
    constructor(@InjectModel(UsersModel.name) private readonly userModel: Model<UsersModel>) {
        super(userModel);
    }
}
