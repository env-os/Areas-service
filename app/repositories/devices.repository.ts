import { Repository, EntityRepository } from "typeorm";
import { Device } from "../entities/device.entity";

@EntityRepository(Device)
export class DevicesRepository extends Repository<Device> {
    async getOneById(id: number): Promise<Device> {
        return await this.findOneOrFail({id: id})
    }
}