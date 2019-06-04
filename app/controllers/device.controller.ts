import { Post, JsonController, Body, Get, Res, Param, Delete, Req, OnUndefined, Put, NotFoundError } from 'routing-controllers';
import { Response, Request } from 'express'
import { DeviceService } from '../services/device.service'
import { DeviceDto } from '../dto/device.dto'
import { Device } from '../entities/device.entity';
import { LogsUtil } from '../utils/logs.util'


@JsonController('/devices')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Post()
    @OnUndefined(201)
    async create(@Body() deviceDto: DeviceDto, @Req() req: Request, @Res() res: Response): Promise<void> {
        LogsUtil.logRequest(req);
        return await this.deviceService.create(deviceDto)
    }

    @Delete('/:slug')
    @OnUndefined(201)
    async delete(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response): Promise<void> {
        LogsUtil.logRequest(req);
        return await this.deviceService.delete(slug);
    }

    @Get('/:slug')
    @OnUndefined(404)
    async getOneBySlug(@Param('slug') slug: string, @Req() req: Request): Promise<Device | undefined> {
        LogsUtil.logRequest(req);
        return await this.deviceService.getOneBySlug(slug);
    }
}