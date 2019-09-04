import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { DeviceRepository } from '../repositories/device.repository';
import { DeviceDTO } from '../dto/device.dto';
import { Device } from '../entities/device.entity';

Service()
export class DeviceService {
    constructor(
        @InjectRepository()
        private readonly deviceRepository: DeviceRepository,
    ) {}

    async create(deviceDto: DeviceDTO): Promise<void> {
        await this.deviceRepository.create(deviceDto);
    }

    async delete(uuid: string) {
        await this.deviceRepository.getOneByUuid(uuid)
        .then((device) => this.deviceRepository.delete(device));
    }

    async getOneByUuid(uuid: string): Promise<Device> {
        return await this.deviceRepository.getOneByUuid(uuid);
    }

    async getAll(): Promise<Device[]> {
        return await this.deviceRepository.getAll();
    }
}
