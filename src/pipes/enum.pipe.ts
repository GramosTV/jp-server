import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class enumPipe implements PipeTransform<string, unknown> {
  private readonly enumObj: unknown;
  constructor(enumObj: unknown) {
    this.enumObj = enumObj;
  }
  transform(value: string, metadata: ArgumentMetadata): unknown {
    if (Object.values(this.enumObj).includes(parseInt(value))) {
      return value;
    }
    throw new BadRequestException('Validation failed');
  }
}
