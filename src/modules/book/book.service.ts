import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../../dto/create-book.dto';
import { UpdateBookDto } from '../../dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../../entities/Book.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Author } from '../../entities/Author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}
  async create(createBookDto: CreateBookDto) {
    let author;
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
    });

    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: string): Promise<Book | null> {
    return await this.bookRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    const book = await this.bookRepository.findOne({ where: { id } });
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
      ...updateBookDto,
      author,
    };

    return this.bookRepository.update(id, updatedBook);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.bookRepository.delete(id);
  }
}
