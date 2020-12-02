import { Url } from '../url.entity';
import { IsAlphanumeric, IsOptional, IsUrl, Length } from 'class-validator';

export class ChangeUrlDto {
  constructor(shortUrl: Url['shortUrl'], userUrl: Url['userUrl']) {
    this.shortUrl = shortUrl;
    this.userUrl = userUrl;
  }

  @IsOptional()
  @IsAlphanumeric()
  @Length(2, 15)
  shortUrl: Url['shortUrl'];

  @IsOptional()
  @IsUrl()
  userUrl: Url['userUrl'];
}
