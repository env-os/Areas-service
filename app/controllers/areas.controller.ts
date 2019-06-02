import { Post, JsonController, Body, Get, Res, Param, Delete, Req } from 'routing-controllers';
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
    async createArea(@Body() areaDto: AreaDto, @Req() req: Request, @Res() res: Response) {
        LogsUtil.logRequest(req);
        const response = await this.areasService.createArea(areaDto);
        return res.send(response);
    }

    @Get('/:slug')
    async getAreaBySlug(@Param('slug') slug: string, @Req() req: Request): Promise<Area> {
        LogsUtil.logRequest(req);
        return await this.areasService.getAreaBySlug(slug);
    }

    @Get('/:slug/devices')
    async getDevicesOfArea(@Param('slug') slug: string, @Req() req: Request): Promise<Device[]> {
        LogsUtil.logRequest(req);
        return await this.areasService.getDevicesOfArea(slug);
    }

    @Get('/:slug/parent')
    async getParentOfArea(@Param('slug') slug: string, @Req() req: Request): Promise<Area> {
        LogsUtil.logRequest(req);
        return await this.areasService.getParentOfArea(slug);
    }

    @Get('/:slug/childrens')
    async getChildrensOfArea(@Param('slug') slug: string, @Req() req: Request): Promise<Area[]> {
        LogsUtil.logRequest(req);
        return await this.areasService.getChildrensOfArea(slug);
    }

    @Delete('/:slug')
    async deleteArea(@Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
        LogsUtil.logRequest(req);
        const response = await this.areasService.deleteArea(slug);
        return res.send(response);
    }
}