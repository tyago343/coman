import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';
import { AuthorModule } from '../author/author.module';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    BookModule,
    AuthorModule,
    ReviewModule,
  ],
})
export class AppModule {}
