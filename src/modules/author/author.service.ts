import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../../dto/create-author.dto';
import { UpdateAuthorDto } from '../../dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../../entities/Author.entity';
import { Book } from '../../entities/Book.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  async create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new Error(`Author #${id} not found`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const books: Book[] = [];
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new Error(`Author #${id} not found`);
    }
    books.push(...(author.books || []));
    if (updateAuthorDto.books) {
      for (const bookId of updateAuthorDto.books) {
        const book = await this.bookRepository.findOne({
          where: { id: bookId },
        });
        if (book) {
          books.push(book);
        }
      }
      await this.authorRepository.update({ id }, { ...updateAuthorDto, books });
      return author;
    }
  }

  async remove(id: number) {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new Error(`Author #${id} not found`);
    }
    await this.authorRepository.remove(author);
  }
}
