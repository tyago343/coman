import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../../entities/Book.entity';
import { Author } from '../../entities/Author.entity';
import { UploadService } from '../upload/upload.service';
@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BookController],
  providers: [BookService, UploadService],
})
export class BookModule {}
