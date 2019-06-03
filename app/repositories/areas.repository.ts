import { EntityRepository, AbstractRepository } from "typeorm";
import { Area } from "../entities/area.entity";

@EntityRepository(Area)
export class AreasRepository extends AbstractRepository<Area> {

    public async create(area: Area): Promise<void> {
        await this.repository.save(area);
    }

    public async delete(area: Area): Promise<void> {
        await this.repository.remove(area);
    }

    public async getOneBySlug(slug: string): Promise<Area | undefined> {
        return await this.repository.findOne({
            where: {slug: slug},
        })
    }

    public async getAllRoots(): Promise<Area[]> {
        return await this.repository.find({
            where: {parent: null}
        })
    }
}