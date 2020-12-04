import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Successful validateUser response' })
export class LoginResponseType {
  @Field({ description: 'JWT personal access token' })
  accessToken: string;
}
