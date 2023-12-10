import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from '../../dto/create-author.dto';
import { UpdateAuthorDto } from '../../dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: { books: true },
    });
    if (!author) {
      throw new NotFoundException(`Author #${id} not found`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    let books: Book[] = [];
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: { books: true },
    });

    if (!author) {
      throw new NotFoundException(`Author #${id} not found`);
    }

    if (updateAuthorDto.books) {
      const concatedBooks = author.books
        ? [...updateAuthorDto.books, ...author.books.map((book) => book.id)]
        : updateAuthorDto.books;

      books = await this.bookRepository.findBy({ id: In(concatedBooks) });
    }

    Object.assign(author, updateAuthorDto);

    author.books = books;

    await this.authorRepository.save(author);
    return author;
  }

  async remove(id: number) {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Author #${id} not found`);
    }
    await this.authorRepository.remove(author);
  }
}
