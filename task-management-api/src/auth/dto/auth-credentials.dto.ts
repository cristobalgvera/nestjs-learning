import { IsString, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @Length(5, 20, { message: 'username must have length between 5 and 15' })
  username: string;

  @IsString()
  @Length(8, 20, { message: 'password must have at least 8 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must have at least one uppercase letter , one lowercase letter and, at least, one number or special character',
  })
  password: string;
}
