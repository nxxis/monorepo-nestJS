import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class HelloResponse {
  @Field()
  message: string;
}
