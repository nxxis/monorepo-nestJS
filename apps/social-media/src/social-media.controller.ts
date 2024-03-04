import { Controller, Get } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';

@Controller()
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Get()
  getHello(): string {
    return this.socialMediaService.getHello();
  }
}
