import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseStringMinMaxPipe implements PipeTransform<string, string> {
  private readonly min: number;
  private readonly max: number;
  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }
  transform(value: string, metadata: ArgumentMetadata): string {
    if (value.length < this.min || value.length > this.max) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
