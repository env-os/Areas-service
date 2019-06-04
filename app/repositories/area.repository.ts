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

    public async getOneBySlug(slug: string): Promise<Area | undefined> {
        return await this.repository.findOne({
            where: {slug: slug},
            join: {
                alias: "area",
                leftJoinAndSelect: {
                    childrens: "area.childrens",
                    parent: "area.parent",
                    device: "area.devices"
                }
            },
        })
    }

    public async getAllRoots(): Promise<Area[]> {
        return await this.repository.find({
            where: {parent: null},
            join: {
                alias: "area",
                leftJoinAndSelect: {
                    childrens: "area.childrens",
                }
            },
        })
    }
}