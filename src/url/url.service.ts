import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlRepository } from './url.repository';
import { CreateUrlDto } from './dto/create-url.dto';
import { ShortUrlDto } from './dto/short-url.dto';
import { ChangeUrlDto } from './dto/change-url.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlRepository)
    private readonly urlRepository: UrlRepository,
  ) {}

  async findAll() {
    return this.urlRepository.find();
  }

  async createUrl(createUrlDto: CreateUrlDto) {
    return this.urlRepository.createUrl(createUrlDto);
  }

  async findByShortUrl(shortUrl: ShortUrlDto['shortUrl']) {
    const url = await this.urlRepository.findByShortUrl(shortUrl);
    return url.userUrl;
  }

  async changeUrl(
    actualShortUrl: ChangeUrlDto['shortUrl'],
    changeUrlDto: ChangeUrlDto,
  ) {
    return this.urlRepository.changeUrl(actualShortUrl, changeUrlDto);
  }
}
