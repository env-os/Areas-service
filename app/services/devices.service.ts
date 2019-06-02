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

    async createDevice(deviceDto: DeviceDto) {
        const device = new Device(deviceDto.slug, deviceDto.area);
        await this.devicesRepository.save(device);
    }

    async deleteDevice(slug: string) {
        await this.devicesRepository.delete({ slug: slug });
    }

    async getDeviceBySlug(slug: string): Promise<Device> {
        return await this.devicesRepository.getOneBySlug(slug);
    }

}
