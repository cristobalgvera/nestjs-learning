import { IsAlphanumeric } from 'class-validator';
import { Url } from '../url.entity';

export class ShortUrlDto {
  @IsAlphanumeric()
  shortUrl: Url['shortUrl'];
}
