import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { PassportModule } from '@nestjs/passport';
import { GraphqlAuthGuard, WebSocketAuthGuard, HttpAuthGuard } from './guards';
import { AuthController } from './auth.controller';

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
  controllers: [AuthController],
})
export class AuthModule {}
