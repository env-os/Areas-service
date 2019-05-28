import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Device } from "./device.entity";

@Entity("Areas")
export class Area {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
    })
    public name: string;

    @Column({
        type: "varchar",
        length: 150,
        nullable: true,
    })
    public description: string;


    @ManyToOne(type => Area, sector => sector.childrens, { onDelete: 'CASCADE' })
    parent: Area;

    @OneToMany(type => Area, sector => sector.parent, { onDelete: 'CASCADE' })
    childrens: Area[];

    @OneToMany(type => Device, device => device.area)
    devices: Device[];

    constructor(name: string, description: string, parent: Area, childrens: Area[], devices: Device[]){
        this.name= name;
        this.description=description;
        this.parent=parent;
        this.childrens=childrens;
        this.devices=devices;
    }

}