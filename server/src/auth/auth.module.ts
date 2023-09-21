import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtAuthGuard } from './jwt/jwt.auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,

    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,

    // {
    //     provide: APP_GUARD,
    //     useClass: JwtAuthGuard,
    //   },

],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}