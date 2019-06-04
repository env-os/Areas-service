import {Entity, ManyToOne, PrimaryGeneratedColumn, Column} from "typeorm";
import {Area} from "./area.entity";

@Entity("Devices")
export class Device {

    @PrimaryGeneratedColumn("uuid")
    public uuid!: string;

    @Column({ unique: true})
    public slug: string;

    @ManyToOne(type => Area, areas => areas.devices, {nullable: false, onDelete: "CASCADE"})
    area: Area;

    constructor(slug: string, area: Area){
        this.slug = slug;
        this.area = area;
    }
}