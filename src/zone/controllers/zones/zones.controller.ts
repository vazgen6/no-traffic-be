import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZoneService } from 'src/zone/services/zone/zone.service';
import { ZoneDto } from './zone.dto';
import { IZone } from './zone.interface';

@ApiTags('Zones')
@Controller('zones')
export class ZoneController {
  constructor(private zoneService: ZoneService) {}

  @Get()
  public async getAll(): Promise<IZone[]> {
    return await this.zoneService.readCsv();
  }

  @Post()
  public async create(@Body() zone: ZoneDto): Promise<IZone> {
    return this.zoneService.appendToCsv(zone);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.zoneService.deleteEntryById(id);
  }
}
