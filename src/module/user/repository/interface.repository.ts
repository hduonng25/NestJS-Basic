import { MongoRepositoryInterface } from 'src/utils/designPattern/respository/mongo';
import { UsersModel } from '../schema';

export interface UserReposititoryInterface extends MongoRepositoryInterface<UsersModel> {}
