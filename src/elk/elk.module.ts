import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElkOptions } from './elk.options';
import { ElkService } from './elk.service';

@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            useClass: ElkOptions,
        }),
    ],
    providers: [ElkOptions, ElkService],
    exports: [ElkService],
})
export class ElkModule {}
