import { Post, JsonController, Body, Get, Res, Param, Delete, Req } from 'routing-controllers';
import { Response, Request } from 'express'
import { DevicesService } from '../services/devices.service'
import { DeviceDto } from '../dto/device.dto'
import { Device } from '../entities/device.entity';


@JsonController('/devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService) {}

    @Post()
    async createDevice(@Body() deviceDto: DeviceDto, @Req() req: Request, @Res() res: Response) {
        console.log("Received POST request at " + req.url + " endpoint.");
        const response = await this.devicesService.createDevice(deviceDto);
        return res.send(response);
    }

    @Delete('/:slug')
    async deleteDevice(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
        console.log("Received DELETE request at " + req.url + " endpoint.");
        const response = await this.devicesService.deleteDevice(slug);
        return res.send(response)
    }

    @Get('/:slug')
    async getDeviceByslug(@Param('slug') slug: string, @Req() req: Request): Promise<Device> {
        console.log("Received GET request at " + req.url + " endpoint.");
        return await this.devicesService.getDevice(slug);
    }
}