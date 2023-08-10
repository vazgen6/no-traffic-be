import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Point } from './zone.interface';

export class ZoneDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  points: Point[];
}
