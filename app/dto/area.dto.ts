import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Area } from '../entities/area.entity';
import { Device } from '../entities/device.entity';

export class AreaDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly name!: string;

  readonly description!: string;

  readonly parent!: Area;

  readonly childrens!: Area[];

  readonly devices!: Device[];
}
