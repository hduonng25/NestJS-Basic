import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { BaseEntity } from '@Utils/entity';
import { PropretiesType } from './type';

@Injectable()
export class ElkService {
    constructor(private readonly esService: ElasticsearchService) {}

    public async createIndex(params: { index: string; propreties: PropretiesType }) {
        const indexExists: boolean = await this.esService.indices.exists({ index: params.index });

        if (!indexExists) {
            await this.esService.indices.create({
                index: params.index,
                mappings: {
                    properties: params.propreties,
                },
            });
        }
        return;
    }

    public async createDocument<T extends BaseEntity>(params: { index: string; document: T }) {
        return this.esService.index({
            index: params.index,
            document: params.document,
            id: params.document.id,
        });
    }

    public async updateDocument<T extends BaseEntity>(params: { index: string; document: T }) {
        return this.esService.update({
            index: params.index,
            doc: params.document,
            id: params.document.id,
        });
    }

    public async search<T>(params: { index: string; keyword: string; fields: string[] }): Promise<T | T[]> {
        const data: SearchResponse = await this.esService.search({
            index: params.index,
            query: {
                multi_match: {
                    query: params.keyword,
                    fields: params.fields,
                },
            },
        });

        return data.hits.hits.map((data) => data._source as T);
    }
}
