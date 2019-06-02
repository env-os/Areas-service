import { Post, JsonController, Body, Get, Res, Param, Delete } from 'routing-controllers';
import { AreasService } from '../services/areas.service';
import { AreaDto } from '../dto/area.dto';
import { Area } from '../entities/area.entity';
import { Response } from 'express'
import { Device } from '../entities/device.entity';


@JsonController('/areas')
export class AreasController {
    constructor(private readonly areasService: AreasService) {}

    @Post()
    async createArea(@Body() areaDto: AreaDto, @Res() res: Response) {
        console.log("Received POST request at /areas endpoint.");
        const response = await this.areasService.createArea(areaDto);
        return res.send(response);
    }

    @Get('/:slug')
    async getAreaByslug(@Param('slug') slug: string): Promise<Area> {
        console.log("Received GET request at /areas/:slug endpoint.");
        return await this.areasService.getArea(slug);
    }

    @Get('/:slug/devices')
    async getDevicesOfArea(@Param('slug') slug: string): Promise<Device[]> {
        console.log("Received GET request at /areas/:slug/devices endpoint.");
        return await this.areasService.getDevicesOfArea(slug);
    }

    @Get('/:slug/parent')
    async getParentOfArea(@Param('slug') slug: string): Promise<Area> {
        console.log("Received GET request at /areas/:slug/parent endpoint.");
        return await this.areasService.getParentOfArea(slug);
    }

    @Get('/:slug/childrens')
    async getChildrensOfArea(@Param('slug') slug: string): Promise<Area[]> {
        console.log("Received GET request at /areas/:slug/childrens endpoint.");
        return await this.areasService.getChildrensOfArea(slug);
    }

    @Delete('/:slug')
    async deleteArea(@Param('slug') slug: string, @Res() res: Response) {
        console.log("Received DELETE request at /areas/:slug endpoint.");
        const response = await this.areasService.deleteArea(slug);
        return res.send(response);
    }
}