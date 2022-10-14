import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class DecimalPipe implements PipeTransform<string, number> {
  private readonly min: number;
  private readonly max: number;
  private readonly maxAfterDot: number;
  constructor(min: number, max: number, maxAfterDot: number) {
    this.min = min;
    this.max = max;
    this.maxAfterDot = maxAfterDot;
  }
  transform(value: string, metadata: ArgumentMetadata): number | null {
    const val = Number(value);
    if (
      isNaN(val) ||
      val < this.min ||
      val > this.max ||
      String(val).split('.')[1].length > this.maxAfterDot
    ) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
