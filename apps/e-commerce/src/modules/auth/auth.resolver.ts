import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { HelloResponse } from './dto/response/hello.response';
import { CreateUserResponse } from './dto/response/create-user.response';
import { SignInUserResponse } from './dto/response/sign-in-user.response';
import { CreateUserInput } from './dto/input/create-user.input';
import { SignInUserInput } from './dto/input/sign-in-user.input';
import { JwtAuthGuard } from './guard/jwt.guard';
import { CurrentUser } from './decorator/current-user';
import { ChangeUserPasswordInput } from './dto/input/change-user-password';
import { UseGuards } from '@nestjs/common';
import { ChangeUserPasswordResponse } from './dto/response/change-user-password';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => HelloResponse)
  printHelloWorld() {
    return { message: 'Hello World' };
  }

  @Mutation(() => CreateUserResponse)
  async signUp(@Args('CreateUserInput') body: CreateUserInput) {
    return await this.authService.createUserAuthService(body);
  }

  @Mutation(() => SignInUserResponse)
  async signIn(@Args('SignInUserInput') body: SignInUserInput) {
    return await this.authService.signInService(body);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation((ChangeUserPasswordInput) => ChangeUserPasswordResponse)
  async changeUserPasswordService(
    @Args('ChangeUserPasswordInput') body: ChangeUserPasswordInput,
    @CurrentUser() user
  ) {
    return await this.authService.changeUserPasswordService(user, body);
  }
}
