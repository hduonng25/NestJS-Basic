import { AllConfigType } from '@Config/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';

@Injectable()
export class ElkOptions implements ElasticsearchOptionsFactory {
    constructor(private readonly configSerice: ConfigService<AllConfigType>) {}

    createElasticsearchOptions(): Promise<ElasticsearchModuleOptions> | ElasticsearchModuleOptions {
        return {
            node: this.configSerice.getOrThrow('elasticSearch.node', { infer: true }),
            auth: {
                username: this.configSerice.getOrThrow('elasticSearch.username', { infer: true }),
                password: this.configSerice.getOrThrow('elasticSearch.password', { infer: true }),
            },
        };
    }
}
