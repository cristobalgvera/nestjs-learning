import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { GraphqlAuthGuard } from './guards/graphql-auth.guard';
import { HttpAuthGuard } from './guards/http-auth.guard';
import { WebSocketAuthGuard } from './guards/web-socket-auth.guard';

const { secret, expiresIn } = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: secret,
      signOptions: {
        expiresIn: expiresIn,
      },
    }),
    PassportModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    GraphqlAuthGuard,
    HttpAuthGuard,
    WebSocketAuthGuard,
  ],
  exports: [GraphqlAuthGuard, HttpAuthGuard, WebSocketAuthGuard, AuthService],
})
export class AuthModule {}
