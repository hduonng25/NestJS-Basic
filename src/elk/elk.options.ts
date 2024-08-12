import { AllConfigType } from '@Config/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';

@Injectable()
export class ElkOptions implements ElasticsearchOptionsFactory {
    constructor(private readonly configService: ConfigService<AllConfigType>) {}

    createElasticsearchOptions(): Promise<ElasticsearchModuleOptions> | ElasticsearchModuleOptions {
        return {
            node: this.configService.getOrThrow('elasticSearch.node', { infer: true }),
            auth: {
                username: this.configService.getOrThrow('elasticSearch.username', { infer: true }),
                password: this.configService.getOrThrow('elasticSearch.password', { infer: true }),
            },
        };
    }
}
