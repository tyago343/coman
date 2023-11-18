import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';
import { AuthorModule } from '../author/author.module';
import { ReviewModule } from '../review/review.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    BookModule,
    AuthorModule,
    ReviewModule,
    AuthModule,
    PassportModule.register({
      session: true,
    }),
  ],
})
export class AppModule {}
