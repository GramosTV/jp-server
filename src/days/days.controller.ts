import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ParseIntMinMaxPipe } from 'src/pipes/parseIntMinMax.pipe';
import { DaysService } from './days.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('days')
export class DaysController {
  constructor(private daysService: DaysService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/many/:numeration')
  async findMany(
    @Request() req,
    @Param('numeration', new ParseIntMinMaxPipe(2, 65535)) numeration: number,
  ) {
    return this.daysService.findMany(req.user.id, numeration);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/single/:numeration')
  async findOne(
    @Request() req,
    @Param('numeration', new ParseIntMinMaxPipe(1, 65535)) numeration: number,
  ) {
    return this.daysService.findOne(req.user.id, numeration);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/latest')
  async findLatestOne(@Request() req) {
    return this.daysService.findLatestOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async InsertOne(@Request() req) {
    const res = await this.daysService.insertOne(req.user.id);
    if (typeof res === 'string') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: res,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return res;
  }
}
