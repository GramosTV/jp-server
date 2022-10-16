import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Patch,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatsSetGuard } from 'src/auth/statsSet.decorator';
import { ParseIntMinMaxPipe } from 'src/pipes/parseIntMinMax.pipe';
import { AvatarsService } from './avatars.service';
@Controller('avatars')
export class AvatarsController {
  constructor(private avatarsService: AvatarsService) {}

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Get('/')
  async findOne(@Request() req) {
    return await this.avatarsService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Post('/:body/:eye/:face/:hat')
  async insertOne(
    @Request() req,
    @Param('body', new ParseIntMinMaxPipe(1, 4)) body: number,
    @Param('eye', new ParseIntMinMaxPipe(1, 16)) eye: number,
    @Param('face', new ParseIntMinMaxPipe(1, 16)) face: number,
    @Param('hat', new ParseIntMinMaxPipe(1, 14)) hat: number,
  ) {
    return await this.avatarsService.insertOne(
      req.user.id,
      body,
      eye,
      face,
      hat,
    );
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Patch('/:body/:eye/:face/:hat')
  async updateOne(
    @Request() req,
    @Param('body', new ParseIntMinMaxPipe(1, 4)) body: number,
    @Param('eye', new ParseIntMinMaxPipe(1, 16)) eye: number,
    @Param('face', new ParseIntMinMaxPipe(1, 16)) face: number,
    @Param('hat', new ParseIntMinMaxPipe(1, 14)) hat: number,
  ) {
    return await this.avatarsService.updateOne(
      req.user.id,
      body,
      eye,
      face,
      hat,
    );
  }
}
