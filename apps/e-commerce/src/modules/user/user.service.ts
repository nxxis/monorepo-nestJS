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

  async findUserByIdService(id) {
    return await this.userRepository.findUserByIdRepository(id);
  }

  async changeUserPasswordService(user, password) {
    return await this.userRepository.changeUserPasswordRepository(user, password);
  }
}
