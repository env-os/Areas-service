import {Entity, ManyToOne, PrimaryColumn } from "typeorm";
import {Area} from "./area.entity";

@Entity("Devices")
export class Device {
    @PrimaryColumn('uuid')
    public uuid: string;

    @ManyToOne(type => Area, areas => areas.devices, {nullable: false, onDelete: "CASCADE"})
    public area: Area;

    constructor(uuid: string, area: Area){
        this.uuid = uuid;
        this.area = area;
    }
}