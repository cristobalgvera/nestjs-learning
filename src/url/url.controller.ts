import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { ShortUrlDto } from './dto/short-url.dto';
import { ChangeUrlDto } from './dto/change-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Post()
  createUrl(@Body(ValidationPipe) createUrlDto: CreateUrlDto) {
    return this.urlService.createUrl(createUrlDto);
  }

  @Get('/:shortUrl')
  findByShortUrl(
    @Param('shortUrl', ValidationPipe) shortUrl: ShortUrlDto['shortUrl'],
  ) {
    return this.urlService.findByShortUrl(shortUrl);
  }

  @Patch('/:shortUrl')
  changeUrl(
    @Param('shortUrl', ValidationPipe) actualShortUrl: ShortUrlDto['shortUrl'],
    @Body(ValidationPipe) changeUrlDto: ChangeUrlDto,
  ) {
    return this.urlService.changeUrl(actualShortUrl, changeUrlDto);
  }
}
