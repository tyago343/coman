import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/User.entity';
import { GoogleStrategy } from './google.stategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    { provide: 'AUTH_SERVICE', useClass: AuthService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
