import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Area} from "./area.entity";

@Entity("Devices")
export class Device {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => Area, areas => areas.devices)
    area: Area;

    constructor(area: Area){
        this.area = area;
    }
}