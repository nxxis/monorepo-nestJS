import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtTokenService } from '@app/authentication';
import * as bcrypt from 'bcrypt';
import lang from '../../constants/language';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService
  ) {}

  async createUserAuthService(data) {
    try {
      const userExists = await this.userService.checkUserExistsService(
        data.email
      );

      if (userExists) {
        throw new BadRequestException(lang.DUPLICATE_EMAIL);
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
        throw new BadRequestException(lang.INCORRECT_EMAIL_OR_PASSWORD);
      }

      const valid = await bcrypt.compare(data.password, user.password);

      if (!valid) {
        throw new BadRequestException(lang.INCORRECT_EMAIL_OR_PASSWORD);
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

  async changeUserPasswordService(user, body) {
    try {
      const userDetails = await this.userService.findUserByIdService(user.id);
      if (!userDetails) {
        throw new BadRequestException(lang.USER_NOT_FOUND);
      }

      const valid = await bcrypt.compare(
        body.oldPassword,
        userDetails.password
      );

      if (!valid) {
        throw new BadRequestException(lang.INCORRECT_PASSWORD);
      }

      if (body.newPassword != body.confirmNewPassword) {
        throw new BadRequestException(lang.PASSWORD_DOESNOT_MATCH);
      }

      const changedPassword = await bcrypt.hash(body.confirmNewPassword, 12);
      return await this.userService.changeUserPasswordService(
        user,
        changedPassword
      );
    } catch (error) {
      return error;
    }
  }
}
