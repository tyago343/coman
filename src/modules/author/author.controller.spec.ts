import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from '../../entities/Author.entity';
import { Repository } from 'typeorm';
import { Book } from '../../entities/Book.entity';

describe('AuthorController', () => {
  let controller: AuthorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
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

    controller = module.get<AuthorController>(AuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
