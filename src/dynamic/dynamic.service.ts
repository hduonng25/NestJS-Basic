import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DynamicService {
    constructor(@Inject('OPTIONS') private readonly options: { someOptions: string }) {}

    public getOptions() {
        return this.options.someOptions;
    }
}
