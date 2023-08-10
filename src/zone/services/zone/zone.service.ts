import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'csv-parser';
import * as fastCsv from 'fast-csv';
import { IZone } from 'src/zone/controllers/zones/zone.interface';
import { convertToPointArray, generateUUID } from 'src/helpers/general';

@Injectable()
export class ZoneService {
  private readonly filePath: string = path.join(__dirname, 'zones.csv');
  private logger: Logger = new Logger();

  public async readCsv(): Promise<IZone[]> {
    const results: IZone[] = [];

    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.filePath)) {
        resolve(results);
        return;
      }
      fs.createReadStream(this.filePath)
        .pipe(csvParser())
        .on('data', (data: IZone) =>
          results.push({
            ...data,
            points: convertToPointArray(data.points as any),
          }),
        )
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  public async appendToCsv(data: Omit<IZone, 'id'>): Promise<IZone> {
    return new Promise((resolve, reject) => {
      const isNewFile = !fs.existsSync(this.filePath);
      const ws = fs.createWriteStream(this.filePath, { flags: 'a' });
      const csvStream = fastCsv.format({
        headers: isNewFile,
        includeEndRowDelimiter: true,
      });

      csvStream.pipe(ws);

      const newZone: IZone = {
        ...data,
        id: generateUUID(),
      };

      csvStream.write(newZone);
      csvStream.end();

      ws.on('finish', () => resolve(newZone));
      ws.on('error', (error) => {
        this.logger.error(error);
        reject(error);
      });
    });
  }

  public async deleteEntryById(id: string): Promise<void> {
    const updatedData: IZone[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .pipe(csvParser())
        .on('data', (row: IZone) => {
          if (row.id !== id) {
            updatedData.push(row);
          }
        })
        .on('end', () => {
          const ws = fs.createWriteStream(this.filePath);
          const csvStream = fastCsv.format({
            headers: true,
            includeEndRowDelimiter: true,
          });

          csvStream.pipe(ws);

          updatedData.forEach((row) => csvStream.write(row));

          csvStream.end();

          ws.on('finish', () => resolve());
          ws.on('error', (error) => reject(error));
        })
        .on('error', (error) => reject(error));
    });
  }
}
