import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AreaRepository } from '../repositories/area.repository';
import { Area } from '../entities/area.entity';
import { AreaDto } from '../dto/area.dto';
import { Device } from '../entities/device.entity';

Service()
export class AreaService {
    constructor(
        @InjectRepository()
        private readonly areaRepository: AreaRepository,
    ) {}

    public async create(areaDto: AreaDto): Promise<void> {
        await this.areaRepository.create(new Area(
            areaDto.name,
            areaDto.description,
            areaDto.parent,
            areaDto.childrens,
            areaDto.devices
        ));
    }

    public async delete(areaSlug: string): Promise<void> {
        await this.areaRepository.getOneBySlug(areaSlug)
        .then((area) => {
            if(area != null){
                this.areaRepository.delete(area);
            }
        })
    }

    public async getOneBySlug(areaSlug: string): Promise<Area | undefined> {
        return await this.areaRepository.getOneBySlug(areaSlug);
    }

    public async getAllRoots(): Promise<Area[]> {
        return await this.areaRepository.getAllRoots();
    }

    public async getChildrens(areaSlug: string): Promise<Area[] | undefined>  {
        return await this.areaRepository.getOneBySlug(areaSlug)
        .then((area) => {
            if(area != null){
                return area.childrens;
            }
        }) 
    }

    public async getParent(areaSlug: string): Promise<Area | undefined>  {
        return await this.areaRepository.getOneBySlug(areaSlug)
        .then((area) => {
            if(area != null){
                return area.parent;
            }
        }) 
    }

    public async getDevices(areaSlug: string): Promise<Device[] | undefined>  {
        return await this.areaRepository.getOneBySlug(areaSlug)
        .then((area) => {
            if(area != null){
                return area.devices;
            }
        }) 
    }

}
