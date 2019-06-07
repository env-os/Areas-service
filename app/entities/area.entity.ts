import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { Device } from "./device.entity";

@Entity("Areas")
export class Area {
    @PrimaryColumn('uuid')
    public uuid: string;

    @Column({type: 'varchar', length: 150})
    public name: string;

    @Column({type: 'text', nullable: true })
    public description: string;

    @OneToMany(type => Device, device => device.area)
    public devices: Device[];

    constructor(uuid: string, name: string, description: string, devices: Device[]){
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.devices = devices;
    }
}