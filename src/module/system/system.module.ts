import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';

@Module({
    imports: [],
    providers: [SystemService],
    controllers: [SystemController],
})
export class SystemModule {}
