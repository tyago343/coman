describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: Repository,
        },
        {
          provide: getRepositoryToken(Author),
          useValue: Repository,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'New Book',
        synopsis: 'This is a new book',
        publishedDate: '2022-01-01',
        price: 19.99,
        author: {
          id: 2,
          name: 'John Doe',
          placeOfBirth: 'London',
          dateOfBirth: '1990-01-01',
        },
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce({ id: 'book-id', ...createBookDto });

      const result = await controller.create(createBookDto);

      expect(result).toEqual({ id: 'book-id', ...createBookDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books: Book[] = [
        {
          id: 'book-1',
          title: 'Book 1',
          synopsis: 'Synopsis 1',
          price: 9.99,
          publishedDate: '2022-01-01',
          author: {
            id: 1,
            name: 'John Doe',
            placeOfBirth: 'London',
            dateOfBirth: '1990-01-01',
          },
        },
        {
          id: 'book-2',
          title: 'Book 2',
          synopsis: 'Synopsis 2',
          price: 14.99,
          publishedDate: '2022-01-01',
          author: {
            id: 1,
            name: 'John Doe',
            placeOfBirth: 'London',
            dateOfBirth: '1990-01-01',
          },
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(books);

      const result = await controller.findAll();

      expect(result).toEqual(books);
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      const bookId = 'book-id';
      const book: Book = {
        id: bookId,
        title: 'Sample Book',
        synopsis: 'This is a sample book',
        price: 9.99,
        publishedDate: '2022-01-01',
        author: {
          id: 1,
          name: 'John Doe',
          placeOfBirth: 'London',
          dateOfBirth: '1990-01-01',
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(book);

      const result = await controller.findOne(bookId);

      expect(result).toEqual(book);
    });
  });

  describe('update', () => {
    it('should update a book by id', async () => {
      const bookId = 'book-id';
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book',
        synopsis: 'This is an updated book',
        price: 14.99,
        publishedDate: '2022-01-01',
        author: {
          id: 2,
          name: 'John Doe',
          placeOfBirth: 'London',
          dateOfBirth: '1990-01-01',
        },
      };
      const updatedBook = {
        id: bookId,
        ...updateBookDto,
      };
      jest.spyOn(service, 'update').mockResolvedValueOnce(updatedBook as Book);

      const result = await controller.update(bookId, updateBookDto);

      expect(result).toEqual({ id: bookId, ...updateBookDto });
    });
  });

  describe('remove', () => {
    it('should remove a book by id', async () => {
      const bookId = 'book-id';

      jest.spyOn(service, 'remove').mockResolvedValueOnce();

      const result = await controller.remove(bookId);

      expect(result).toBeUndefined();
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from '../../dto/create-book.dto';
import { UpdateBookDto } from '../../dto/update-book.dto';
import { Book } from '../../entities/Book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../../entities/Author.entity';
