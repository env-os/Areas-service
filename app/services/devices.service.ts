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

    async create(deviceDto: DeviceDto) {
        const device = new Device(deviceDto.area);
        await this.devicesRepository.save(device);
    }

    async delete(id: number) {
        await this.devicesRepository.delete(id);
    }

    async getOneById(id: number): Promise<Device> {
        return await this.devicesRepository.getOneById(id);
    }

}
