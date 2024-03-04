import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignInUserResponse {
  @Field()
  accessToken: string;

  @Field()
  id: string;
}
