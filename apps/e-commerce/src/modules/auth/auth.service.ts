import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtTokenService } from '@app/authentication';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async createUserAuthService(data) {
    try {
      const userExists = await this.userService.checkUserExistsService(
        data.email,
      );

      if (userExists) {
        throw new BadRequestException('User already Exists');
      }

      data.password = await bcrypt.hash(data.password, 12);

      const newUser = await this.userService.createUserService(data);
      const payload = {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
      };

      const accessToken = await this.jwtTokenService.generateToken(payload, {
        accessTokenSecret: process.env.JWT_SECRET,
      });
      return { accessToken, id: newUser._id };
    } catch (error) {
      return error;
    }
  }

  async signInService(data) {
    try {
      const user = await this.userService.checkUserExistsService(data.email);

      if (!user) {
        throw new BadRequestException('email/password incorrect');
      }

      const valid = await bcrypt.compare(data.password, user.password);

      if (!valid) {
        throw new BadRequestException('email/password incorrect');
      }

      const payload = {
        name: user.name,
        email: user.email,
        id: user._id,
      };

      const accessToken = await this.jwtTokenService.generateToken(payload, {
        accessTokenSecret: process.env.JWT_SECRET,
      });
      return { accessToken, id: user._id };
    } catch (error) {
      return error;
    }
  }
}
