import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { DevicesRepository } from '../repositories/devices.repository';
import { DeviceDto } from '../dto/device.dto';
import { Device } from '../entities/device.entity';

Service()
export class DevicesService {
    constructor(
        @InjectRepository()
        private readonly devicesRepository: DevicesRepository,
    ) {}

    async create(deviceDto: DeviceDto): Promise<void> {
        const device = new Device(deviceDto.slug, deviceDto.area);
        await this.devicesRepository.create(device);
    }

    async delete(slug: string): Promise<void> {
        await this.devicesRepository.getOneBySlug(slug)
        .then((device) => {
            if(device != null){
                this.devicesRepository.delete(device);
            }
        })
    }

    async getOneBySlug(slug: string): Promise<Device | undefined> {
        return await this.devicesRepository.getOneBySlug(slug);
    }

}
