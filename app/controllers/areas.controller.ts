import { Post, JsonController, Body, Get, Res, Param, Delete } from 'routing-controllers';
import { AreasService } from '../services/areas.service';
import { AreaDto } from '../dto/area.dto';
import { Area } from '../entities/area.entity';
import { Response } from 'express'


@JsonController('/areas')
export class AreasController {
    constructor(private readonly areaService: AreasService) {}

    @Post()
    async create(@Body() areaDto: AreaDto, @Res() res: Response) {
        console.log("Received POST request for create a new area");
        const response = await this.areaService.create(areaDto);
        console.log(response);
        return res.send(response);
    }

    @Get('/:id')
    async getOneByName(@Param('id') id: number): Promise<Area> {
        console.log("Received GET request to view the root with children and related devices");
        return await this.areaService.getOneById(id);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        console.log("Received DELETE request to eliminate an area and cascade all the associated children");
        const response = await this.areaService.delete(id);
        console.log(response);
        return res.send(response);
    }
}