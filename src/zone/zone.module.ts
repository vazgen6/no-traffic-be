import { Module } from '@nestjs/common';
import { ZoneController } from './controllers/zones/zones.controller';
import { ZoneService } from './services/zone/zone.service';

@Module({
  controllers: [ZoneController],
  providers: [ZoneService],
})
export class ZoneModule {}
