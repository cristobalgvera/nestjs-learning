import { EntityRepository, Repository } from 'typeorm';
import { Url } from './url.entity';
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';
import { ShortUrlDto } from './dto/short-url.dto';
import { NotFoundException } from '@nestjs/common';
import { ChangeUrlDto } from './dto/change-url.dto';

@EntityRepository(Url)
export class UrlRepository extends Repository<Url> {
  async createUrl({ url }: CreateUrlDto) {
    const newUrl = new Url(url);
    newUrl.shortUrl = nanoid(6);

    return newUrl.save();
  }

  async findByShortUrl(shortUrl: ShortUrlDto['shortUrl']) {
    const query = this.createQueryBuilder();

    query.where({ shortUrl: shortUrl });

    try {
      return await query.getOneOrFail();
    } catch (error) {
      throw new NotFoundException(`shortUrl '${shortUrl}' was not found`);
    }
  }

  async changeUrl(
    actualShortUrl: ChangeUrlDto['shortUrl'],
    { shortUrl, userUrl }: ChangeUrlDto,
  ) {
    const url = await this.findByShortUrl(actualShortUrl);

    if (shortUrl) url.shortUrl = shortUrl;
    if (userUrl) url.userUrl = userUrl;

    return await url.save();
  }
}
