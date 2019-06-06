import { EntityRepository, AbstractRepository } from "typeorm";
import { Device } from "../entities/device.entity";

@EntityRepository(Device)
export class DeviceRepository extends AbstractRepository<Device> {

    public async create(device: Device): Promise<void> {
        await this.repository.save(device);
    }

    public async delete(device: Device): Promise<void> {
        await this.repository.remove(device);
    }

    public async getOneByUuid(uuid: string): Promise<Device> {
        return await this.repository.findOneOrFail({
            where: {uuid: uuid},
            relations: ['area'],
        });
    }

    public async getAll(): Promise<Device[]> {
        return await this.repository.find();
    }
}