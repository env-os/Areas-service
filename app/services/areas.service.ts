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

    public async create(areaDto: AreaDto){
        await this.areasRepository.create(new Area(
            areaDto.name,
            areaDto.description,
            areaDto.parent,
            areaDto.childrens,
            areaDto.devices
        ));
    }

    public async delete(areaSlug: string) {
        await this.areasRepository.getOneBySlug(areaSlug)
        .then((area) => {
            if(area != null){
                this.areasRepository.delete(area);
            }
        })
    }

    public async getOneBySlug(areaSlug: string): Promise<Area | undefined> {
        return await this.areasRepository.getOneBySlug(areaSlug);
    }

    public async getAllRoots(): Promise<Area[]> {
        return await this.areasRepository.getAllRoots();
    }

}
