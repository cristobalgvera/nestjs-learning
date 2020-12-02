import { IsUrl } from 'class-validator';
import { Url } from '../url.entity';

export class CreateUrlDto {
  @IsUrl()
  url: Url['userUrl'];
}
