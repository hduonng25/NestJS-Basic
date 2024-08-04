import { Body, Controller, Post } from '@nestjs/common';
import { OnlyAdminGuard } from '@Utils/guard';
import { SystemService } from './system.service';

@Controller('system')
// @UseGuards(OnlyAdminGuard)
export class SystemController {
    constructor(private readonly systemService: SystemService) {}

    @Post()
    public async createSystemParam(@Body() body: { name: string; value: string[] }) {
        return await this.systemService.createSystemParams(body);
    }

    @Post('reload')
    public async reloadSystemParam() {
        return this.systemService.getSystemParams();
    }
}
