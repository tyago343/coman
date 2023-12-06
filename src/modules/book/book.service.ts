import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../../dto/create-book.dto';
import { UpdateBookDto } from '../../dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../../entities/Book.entity';
import { Repository } from 'typeorm';
import { Author } from '../../entities/Author.entity';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    private readonly uploadService: UploadService,
  ) {}
  async create({
    createBookDto,
    file,
  }: {
    createBookDto: CreateBookDto;
    file: Express.Multer.File;
  }) {
    let author;
    let frontPage;
    if (file) {
      const uploadFrontPage = await this.uploadService.uploadFile(file);
      frontPage = uploadFrontPage.Location;
    }
    if (createBookDto.author) {
      author = await this.authorRepository.findOne({
        where: { id: +createBookDto.author },
      });
      if (!author) {
        throw new NotFoundException('Author not found');
      }
    }
    const book = this.bookRepository.create({
      ...createBookDto,
      author,
      frontPage,
    });

    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({
      relations: {
        author: true,
      },
    });
  }

  async findOne(id: string): Promise<Book | null> {
    return await this.bookRepository.findOne({
      where: { id },
      relations: { author: true },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { author: true },
    });
    let author;
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    if (updateBookDto.author) {
      author = await this.authorRepository.findOne({
        where: { id: +updateBookDto.author },
      });
      if (!author) {
        throw new NotFoundException('Author not found');
      }
    }
    const updatedBook = {
      ...book,
      ...updateBookDto,
      author,
    };

    return await this.bookRepository.save(updatedBook);
  }

  async remove(id: string) {
    await this.bookRepository.delete(id);
  }
}
