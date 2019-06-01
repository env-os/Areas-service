import { Area } from '../entities/area.entity';
import { Device } from '../entities/device.entity';

export class AreaDto {
  readonly name!: string;
  readonly description!: string;
  readonly parent!: Area;
  readonly childrens!: Area[];
  readonly devices!: Device[];
}
