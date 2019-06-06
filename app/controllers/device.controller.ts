import { Request } from 'express'
import { JsonController, Post, OnUndefined, Body, Req, Param, Delete, Get, BadRequestError, NotFoundError } from 'routing-controllers';
import { DeviceService } from '../services/device.service'
import { LogsUtil } from '../utils/logs.util';
import { DeviceDTO } from '../dto/device.dto';
import { Device } from '../entities/device.entity';


@JsonController('/devices')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Post()
    @OnUndefined(201)
    async create(@Body() deviceDTO: DeviceDTO, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.deviceService.create(deviceDTO)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Delete('/:uuid')
    @OnUndefined(201)
    async delete(@Param('uuid') uuid: string, @Req() req: Request) {
        LogsUtil.logRequest(req);
        await this.deviceService.delete(uuid)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Get('/:uuid')
    @OnUndefined(404)
    async getOneByUuid(@Param('uuid') uuid: string, @Req() req: Request): Promise<Device> {
        LogsUtil.logRequest(req);
        return await this.deviceService.getOneByUuid(uuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }

    @Get()
    @OnUndefined(404)
    async getAll(@Req() req: Request): Promise<Device[]> {
        LogsUtil.logRequest(req);
        return await this.deviceService.getAll()
        .catch(() => {
            throw new NotFoundError();
        })
    }
}