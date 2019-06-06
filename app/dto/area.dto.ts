import { Device } from '../entities/device.entity';

export class AreaDTO {
    readonly uuid!: string;
    readonly name!: string;
    readonly description!: string;
    readonly devices!: Device[];
}
