import { Post, JsonController, Body, Get, Res, Param, Delete, Req, OnUndefined } from 'routing-controllers';
import { AreasService } from '../services/areas.service';
import { AreaDto } from '../dto/area.dto';
import { Area } from '../entities/area.entity';
import { Response, Request } from 'express'
import { Device } from '../entities/device.entity';
import { LogsUtil } from '../utils/logs.util'


@JsonController('/areas')
export class AreasController {
    constructor(private readonly areasService: AreasService) {}

    @Post()
    @OnUndefined(201)
    async create(@Body() areaDto: AreaDto, @Req() req: Request, @Res() res: Response): Promise<void> {
        LogsUtil.logRequest(req);
        await this.areasService.create(areaDto);
    }

    @Delete('/:slug')
    @OnUndefined(201)
    async delete(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
        LogsUtil.logRequest(req);
        await this.areasService.delete(slug);
    }

    @Get()
    @OnUndefined(404)
    async getAllRoots(@Req() req: Request): Promise<Area[]> {
        LogsUtil.logRequest(req);
        return await this.areasService.getAllRoots();
    }

    @Get('/:slug')
    @OnUndefined(404)
    async getOneBySlug(@Param('slug') slug: string, @Req() req: Request): Promise<Area | undefined> {
        LogsUtil.logRequest(req);
        return await this.areasService.getOneBySlug(slug);
    }
}