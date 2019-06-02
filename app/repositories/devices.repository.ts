import { Repository, EntityRepository } from "typeorm";
import { Device } from "../entities/device.entity";

@EntityRepository(Device)
export class DevicesRepository extends Repository<Device> {
    async getOneBySlug(slug: string): Promise<Device> {
        return await this.findOneOrFail({slug: slug})
    }
}