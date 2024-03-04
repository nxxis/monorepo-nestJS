import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediaController } from './social-media.controller';
import { SocialMediaService } from './social-media.service';

describe('SocialMediaController', () => {
  let socialMediaController: SocialMediaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SocialMediaController],
      providers: [SocialMediaService],
    }).compile();

    socialMediaController = app.get<SocialMediaController>(SocialMediaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(socialMediaController.getHello()).toBe('Hello World!');
    });
  });
});
