import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

@InputType()
export class ChangeUserPasswordInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  oldPassword: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  confirmNewPassword: string;
}
