import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>
  ) {}

  async createUserRepository(data) {
    try {
      const user = new this.userModel(data);
      if (!user) {
        throw new Error('Error while creating the user');
      }
      return await user.save();
    } catch (error) {
      return error;
    }
  }

  async checkUserExistsRepository(email: string) {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      return error;
    }
  }

  async findUserByIdRepository(id) {
    try {
      return await this.userModel.findById({ _id: id });
    } catch (error) {
      return error;
    }
  }

  async changeUserPasswordRepository(user, password) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(user.id, {
        password: password,
      });

      if (!updatedUser) {
        throw new Error('there was problem changing password');
      }
      return { status: true };
    } catch (error) {}
  }
}
