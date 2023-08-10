import { Point } from 'src/zone/controllers/zones/zone.interface';
import { convertToPointArray } from './general';

describe('convertToPointArray', () => {
  it('should convert string to array of points', () => {
    const inputString = '131,69,105,106,71,41,162,21';
    const expectedOutput: Point[] = [
      [131, 69],
      [105, 106],
      [71, 41],
      [162, 21],
    ];

    const result = convertToPointArray(inputString);
    expect(result).toEqual(expectedOutput);
  });
});
