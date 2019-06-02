import { Post, JsonController, Body, Get, Res, Param, Delete } from 'routing-controllers';
import { Response } from 'express'
import { DevicesService } from '../services/devices.service'
import { DeviceDto } from '../dto/device.dto'
import { Device } from '../entities/device.entity';


@JsonController('/devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService) {}

    @Post()
    async createDevice(@Body() deviceDto: DeviceDto, @Res() res: Response) {
        const response = await this.devicesService.createDevice(deviceDto);
        return res.send(response);
    }

    @Delete('/:slug')
    async deleteDevice(@Param('slug') slug: string, @Res() res: Response) {
        const response = await this.devicesService.deleteDevice(slug);
        return res.send(response)
    }

    @Get('/:slug')
    async getDeviceByslug(@Param('slug') slug: string): Promise<Device> {
        return await this.devicesService.getDevice(slug);
    }
}