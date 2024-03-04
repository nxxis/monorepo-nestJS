import { NestFactory } from '@nestjs/core';
import { SocialMediaModule } from './social-media.module';

async function bootstrap() {
  const app = await NestFactory.create(SocialMediaModule);
  await app.listen(3000);
}
bootstrap();
