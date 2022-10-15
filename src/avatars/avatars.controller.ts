import { Controller } from '@nestjs/common';
import { AvatarsService } from './avatars.service';

@Controller('avatars')
export class AvatarsController {
  constructor(private avatarsService: AvatarsService) {}
}
