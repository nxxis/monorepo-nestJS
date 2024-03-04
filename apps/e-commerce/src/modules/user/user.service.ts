import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUserService(data) {
    return await this.userRepository.createUserRepository(data);
  }

  async checkUserExistsService(email) {
    return await this.userRepository.checkUserExistsRepository(email);
  }
}
