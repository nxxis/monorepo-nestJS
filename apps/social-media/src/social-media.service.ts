import { Injectable } from '@nestjs/common';

@Injectable()
export class SocialMediaService {
  getHello(): string {
    return 'Hello World!';
  }
}
