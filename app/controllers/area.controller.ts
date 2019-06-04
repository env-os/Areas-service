import { Post, JsonController, Body, Get, Res, Param, Delete, Req, OnUndefined } from 'routing-controllers';
import { AreaService } from '../services/area.service';
import { AreaDto } from '../dto/area.dto';
import { Area } from '../entities/area.entity';
import { Request } from 'express'
import { LogsUtil } from '../utils/logs.util'
import { Device } from '../entities/device.entity';


@JsonController('/areas')
export class AreaController {
    constructor(private readonly areaService: AreaService) {}

    @Post()
    @OnUndefined(201)
    async create(@Body() areaDto: AreaDto, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.areaService.create(areaDto);
    }

    @Delete('/:slug')
    @OnUndefined(201)
    async delete(@Param('slug') slug: string, @Req() req: Request) {
        LogsUtil.logRequest(req);
        await this.areaService.delete(slug);
    }

    @Get()
    @OnUndefined(404)
    async getAllRoots(@Req() req: Request): Promise<Area[]> {
        LogsUtil.logRequest(req);
        return await this.areaService.getAllRoots();
    }

    @Get('/:slug')
    @OnUndefined(404)
    async getOneBySlug(@Param('slug') slug: string, @Req() req: Request): Promise<Area | undefined> {
        LogsUtil.logRequest(req);
        return await this.areaService.getOneBySlug(slug);
    }

    @Get('/:slug/childrens')
    @OnUndefined(404)
    async getChilldrens(@Param('slug') slug: string, @Req() req: Request): Promise<Area[] | undefined> {
        LogsUtil.logRequest(req);
        return await this.areaService.getChildrens(slug);
    }

    @Get('/:slug/parent')
    @OnUndefined(404)
    async getParent(@Param('slug') slug: string, @Req() req: Request): Promise<Area | undefined> {
        LogsUtil.logRequest(req);
        return await this.areaService.getParent(slug);
    }

    @Get('/:slug/devices')
    @OnUndefined(404)
    async getDevices(@Param('slug') slug: string, @Req() req: Request): Promise<Device[] | undefined> {
        LogsUtil.logRequest(req);
        return await this.areaService.getDevices(slug);
    }
}