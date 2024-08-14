import 'dotenv/config';
import mongoose from 'mongoose';
import process from 'process';
import { SYSTEM_PARAMS } from './system.params';

export const NAME_SYSTEM_PARAMS_MODEL: string = 'SystemParams';

export const systemParamsSchema = new mongoose.Schema({
    name: { required: true, type: String },
    value: { required: true, type: String },
});

export async function SystemConfigure() {
    await mongoose.connect(process.env.MONGO_URI);

    const systemParamsModel = mongoose.model(NAME_SYSTEM_PARAMS_MODEL, systemParamsSchema);

    const data = await systemParamsModel.find().exec();

    console.log('Start assigning system data.');
    
    for (let i = 0; i < data.length; i++) {
        console.log(`${data[i].name} data is being assigned => Done!`);
        
        switch (SYSTEM_PARAMS.hasOwnProperty(data[i].name)) {
            case true:
                SYSTEM_PARAMS[data[i].name] = data[i].value;
                break;
            case false:
                SYSTEM_PARAMS[data[i].name] = '';
                break;
            default:
                SYSTEM_PARAMS[data[i].name] = '';
                break;
        }
    }

    console.log('');
    console.log('--->All data has been assigned successfully<---');
    console.log('');
    console.log('NestJS app run...');
    console.log('');
}
