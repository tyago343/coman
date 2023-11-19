import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from '../../entities/Review.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';
import { Book } from '../../entities/Book.entity';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: Repository,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: Repository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
