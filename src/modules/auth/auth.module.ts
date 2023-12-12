import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/User.entity';
import { GoogleStrategy } from './google.stategy';
import { SessionSerializer } from './session.serializer';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      signOptions: { expiresIn: '1d' },
      secret: 'process.env.JWT_SECRET',
    }),
    ConfigModule.forRoot(),
  ],
  providers: [
    GoogleStrategy,
    JwtStrategy,
    JwtService,
    SessionSerializer,
    AuthService,
    { provide: 'AUTH_SERVICE', useClass: AuthService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
