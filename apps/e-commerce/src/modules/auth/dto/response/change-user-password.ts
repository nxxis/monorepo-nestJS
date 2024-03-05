import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ChangeUserPasswordResponse {
  @Field()
  status: boolean;
}
