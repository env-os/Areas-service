import { Post, JsonController, Body, Get, Res, Param, Delete } from 'routing-controllers';
import { Response } from 'express'
import { DevicesService } from '../services/devices.service'
import { DeviceDto } from '../dto/device.dto'
import { Device } from '../entities/device.entity';


@JsonController('/devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService) {}

    @Post()
    async create(@Body() deviceDto: DeviceDto, @Res() res: Response) {
        const response = await this.devicesService.create(deviceDto);
        return res.send(response);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const response = await this.devicesService.delete(id);
        return res.send(response)
    }

    @Get('/:id')
    async getOneById(@Param('id') id: number): Promise<Device> {
        return await this.devicesService.getOneById(id);
    }
}