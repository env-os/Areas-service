import { Post, JsonController, Body, Get, Res, Param, Delete, Controller } from 'routing-controllers';
import { AreaService } from '../services/area.service';
import { AreaDto } from '../dto/area.dto';
import { Area } from '../entities/area.entity';
import { Response } from 'express'


@JsonController('/areas')
export class AreaController {
    constructor(private readonly areaService: AreaService) {}

    @Post()
    async create(@Body() sectorDto: AreaDto, @Res() res: Response) {
        const response = await this.areaService.create(sectorDto);
        return res.send(response);
    }

    @Get()
    async getAll(): Promise<Area[]> {
        return await this.areaService.getAll();
    }

    @Get('/:id')
    async getOneByName(@Param('id') id: number): Promise<Area> {
        return await this.areaService.getOneById(id);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        const response = await this.areaService.delete(id);
        return res.send(response);
    }
}