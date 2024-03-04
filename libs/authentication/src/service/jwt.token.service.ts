import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(payload: any, options: { accessTokenSecret: string }) {
    try {
      const { accessTokenSecret } = options; /// you don't have to do this because options only has accessTokenSecret so no need to extract it
      const accessToken = this.jwtService.sign(payload, {
        secret: accessTokenSecret,
      });
      return accessToken;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
