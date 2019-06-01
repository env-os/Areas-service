import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { DevicesRepository } from '../repositories/devices.repository';

Service()
export class DevicesService {
    constructor(
        @InjectRepository()
        private readonly devicesRepository: DevicesRepository,
    ) {}

}
