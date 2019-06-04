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

    public async getOneBySlug(slug: string): Promise<Device | undefined> {
        return await this.repository.findOne({
            where: {slug: slug},
        })
    }
}