import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateUserResponse {
  @Field()
  accessToken: string;

  @Field()
  id: string;
}
