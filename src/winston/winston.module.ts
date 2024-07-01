import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { ElkModule } from '../elk/elk.module';
import { WinstonOptions } from './winston.options';

@Module({
    imports: [
        ElkModule,
        WinstonModule.forRootAsync({
            useClass: WinstonOptions,
        }),
    ],
    providers: [WinstonOptions],
    exports: [],
})
export class WinstonLoggerModule {}
