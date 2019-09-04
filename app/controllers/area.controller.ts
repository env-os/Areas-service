import { Request } from 'express'
import { JsonController, Post, OnUndefined, Body, Req, Delete, Param, Get, BadRequestError, NotFoundError } from 'routing-controllers';
import { AreaDTO } from '../dto/area.dto';
import { LogsUtil } from '../utils/logs.util';
import { Area } from '../entities/area.entity';
import { AreaService } from '../services/area.service';


@JsonController('/areas')
export class AreaController {
    constructor(private readonly areaService: AreaService) {}
    @Post()
    @OnUndefined(201)
    async create(@Body() areaDto: AreaDTO, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.areaService.create(areaDto)
        .catch(() => {
            throw new BadRequestError("Error during area creation.");
        })
    }

    @Delete('/:uuid')
    @OnUndefined(201)
    async delete(@Param('uuid') uuid: string, @Req() req: Request) {
        LogsUtil.logRequest(req);
        await this.areaService.delete(uuid)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Get('/:uuid')
    @OnUndefined(404)
    async getOneByUuid(@Param('uuid') uuid: string, @Req() req: Request): Promise<Area> {
        LogsUtil.logRequest(req);
        return await this.areaService.getOneByUuid(uuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }

    @Get()
    @OnUndefined(404)
    async getAll(@Req() req: Request): Promise<Area[]> {
        LogsUtil.logRequest(req);
        return await this.areaService.getAll()
        .catch(() => {
            throw new NotFoundError();
        })
    }
}