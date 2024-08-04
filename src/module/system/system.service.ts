import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { NAME_SYSTEM_PARAMS_MODEL, systemParamsSchema } from '../../system.configure';
import { SYSTEM_PARAMS } from '../../system.params';

@Injectable()
export class SystemService {
    private systemParamModels: Model<any>;

    constructor() {
        this.systemParamModels = mongoose.model(NAME_SYSTEM_PARAMS_MODEL, systemParamsSchema);
    }

    public async createSystemParams(params: { name: string; value: string[] }) {
        return await this.systemParamModels.create(params);
    }

    public async getSystemParams() {
        const systemParams = await this.systemParamModels.find().exec();
        for (let i = 0; i < systemParams.length; i++) {
            switch (SYSTEM_PARAMS.hasOwnProperty(systemParams[i].name)) {
                case true:
                    SYSTEM_PARAMS[systemParams[i].name] = systemParams[i].value;
                    break;
                case false:
                    SYSTEM_PARAMS[systemParams[i].name] = '';
                    break;
                default:
                    SYSTEM_PARAMS[systemParams[i].name] = '';
                    break;
            }
        }

        return {
            mess: 'Get system params successfuly',
        };
    }
}
