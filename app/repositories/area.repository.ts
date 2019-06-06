import { EntityRepository, AbstractRepository } from "typeorm";
import { Area } from "../entities/area.entity";

@EntityRepository(Area)
export class AreaRepository extends AbstractRepository<Area> {

    public async create(area: Area): Promise<void> {
        await this.repository.save(area);
    }

    public async delete(area: Area): Promise<void> {
        await this.repository.remove(area);
    }

    public async getOneByUuid(uuid: string): Promise<Area> {
        return await this.repository.findOneOrFail({
            where: {uuid: uuid},
            relations: ['devices']
        });
    }

    public async getAll(): Promise<Area[]> {
        return await this.repository.find();
    }
}