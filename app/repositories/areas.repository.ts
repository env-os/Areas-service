import { Repository, EntityRepository } from "typeorm";
import { Area } from "../entities/area.entity";

@EntityRepository(Area)
export class AreasRepository extends Repository<Area> {
    
    async getOneBySlug(slug: string): Promise<Area> {
        return await this.findOneOrFail({
            where: {slug: slug},
            join: {
                alias: "area",
                leftJoinAndSelect: {
                    parent: "area.parent",
                    childrens: "area.childrens",
                    devices: "area.devices",
                }
            },
        });
    }
}