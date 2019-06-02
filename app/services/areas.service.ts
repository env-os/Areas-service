import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AreasRepository } from '../repositories/areas.repository';
import { Area } from '../entities/area.entity';
import { AreaDto } from '../dto/area.dto';
import { Device } from '../entities/device.entity';

Service()
export class AreasService {
    constructor(
        @InjectRepository()
        private readonly areasRepository: AreasRepository,
    ) {}

    public async createArea(areaDto: AreaDto){
        const area = new Area(
            areaDto.name,
            areaDto.description,
            areaDto.parent,
            areaDto.childrens,
            areaDto.devices
        )
        await this.areasRepository.save(area);
    }

    public async getAreaBySlug(slug: string): Promise<Area> {
        return await this.areasRepository.getOneBySlug(slug);
    }

    public async getDevicesOfArea(areaSlug: string): Promise<Device[]> {
        const area = await this.areasRepository.getOneBySlug(areaSlug);
        return await area.devices;
    }

    public async getParentOfArea(areaSlug: string): Promise<Area> {
        const area = await this.areasRepository.getOneBySlug(areaSlug);
        return await area.parent;
    }

    public async getChildrensOfArea(areaSlug: string): Promise<Area[]> {
        const area = await this.areasRepository.getOneBySlug(areaSlug);
        return await area.childrens;
    }

    public async deleteArea(areaSlug: string) {
        await this.areasRepository.delete({slug: areaSlug});
    }

}
