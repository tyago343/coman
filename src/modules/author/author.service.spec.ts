import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from '../../entities/Author.entity';
import { Repository } from 'typeorm';
import { Book } from '../../entities/Book.entity';

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useValue: Repository,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
