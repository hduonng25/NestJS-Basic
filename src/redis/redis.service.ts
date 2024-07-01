import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager'; // ! Don't forget this import

@Injectable()
export class RedisService {
    /**
     * Demo use redis cache
     */
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    public async demoCache() {
        const data = {
            name: 'hduong',
            age: 22,
        };

        await this.cache.set('dataKey', data); //Set data in the cache
        await this.cache.get<string>('dataKey'); //Get data in the cache
        await this.cache.del('dataKey'); //Delete data in the cache

        return data;
    }
}
