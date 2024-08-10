import { Body, Controller, Post } from '@nestjs/common';
import { SystemService } from './system.service';
import { RolesAccept } from '../auth/decorator';
import { RoleConstant } from '@Utils/constant';

@Controller('system')
@RolesAccept(RoleConstant.ADMIN)
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
