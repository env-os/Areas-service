import { Post, JsonController, Body, Get, Res, Param, Delete, Req } from 'routing-controllers';
import { Response, Request } from 'express'
import { DevicesService } from '../services/devices.service'
import { DeviceDto } from '../dto/device.dto'
import { Device } from '../entities/device.entity';
import { LogsUtil } from '../utils/logs.util'


@JsonController('/devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService) {}

    @Post()
    async createDevice(@Body() deviceDto: DeviceDto, @Req() req: Request, @Res() res: Response) {
        LogsUtil.logRequest(req);
        const response = await this.devicesService.createDevice(deviceDto);
        return res.send(response);
    }

    @Delete('/:slug')
    async deleteDevice(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
        LogsUtil.logRequest(req);
        const response = await this.devicesService.deleteDevice(slug);
        return res.send(response)
    }

    @Get('/:slug')
    async getDeviceBySlug(@Param('slug') slug: string, @Req() req: Request): Promise<Device> {
        LogsUtil.logRequest(req);
        return await this.devicesService.getDeviceBySlug(slug);
    }
}