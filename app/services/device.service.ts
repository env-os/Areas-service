import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { DeviceRepository } from '../repositories/device.repository';
import { DeviceDto } from '../dto/device.dto';
import { Device } from '../entities/device.entity';

Service()
export class DeviceService {
    constructor(
        @InjectRepository()
        private readonly deviceRepository: DeviceRepository,
    ) {}

    async create(deviceDto: DeviceDto): Promise<void> {
        const device = new Device(deviceDto.slug, deviceDto.area);
        await this.deviceRepository.create(device);
    }

    async delete(slug: string): Promise<void> {
        await this.deviceRepository.getOneBySlug(slug)
        .then((device) => {
            if(device != null){
                this.deviceRepository.delete(device);
            }
        })
    }

    async getOneBySlug(slug: string): Promise<Device | undefined> {
        return await this.deviceRepository.getOneBySlug(slug);
    }

}
