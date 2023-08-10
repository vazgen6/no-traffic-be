import { Point } from 'src/zone/controllers/zones/zone.interface';
import { v4 as uuidv4 } from 'uuid';

export const generateUUID = (): string => uuidv4();

export const convertToPointArray = (str: string): Point[] => {
  const numbers: number[] = str.split(',').map(Number);
  const points: Point[] = [];

  for (let i = 0; i < numbers.length; i += 2) {
    points.push([numbers[i], numbers[i + 1]]);
  }

  return points;
};
