describe('ReviewController', () => {
  let controller: ReviewController;
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
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

    controller = module.get<ReviewController>(ReviewController);
    service = module.get<ReviewService>(ReviewService);
  });

  describe('create', () => {
    it('should create a new review', async () => {
      const createReviewDto: CreateReviewDto = {
        rating: 5,
        comment: 'Great book!',
        userId: '1',
        bookId: '12345678-1234-1234-1234-1234567890ab',
      };

      const createdReview: Review = {
        id: 1,
        rating: 5,
        comment: 'Great book!',
        user: {
          id: 1,
          name: 'test',
          lastname: 'tre',
          username: 'test',
        },
        book: {
          id: '12345678-1234-1234-1234-1234567890ab',
          title: 'test',
          synopsis: 'test',
          frontPage: 'test',
          price: 1,
          publishedDate: 'new Date()',
          author: {
            id: 1,
            name: 'test',
            dateOfBirth: 'new Date()',
            books: [],
            placeOfBirth: 'test',
          },
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdReview);

      const result = await controller.create(createReviewDto);

      expect(result).toBe(createdReview);
    });
  });

  describe('findAll', () => {
    it('should return an array of reviews', async () => {
      const reviews = [
        {
          id: 1,
          rating: 5,
          comment: 'Great book!',
          user: {
            id: 1,
            name: 'test',
            lastname: 'tre',
            username: 'test',
          },
          book: {
            id: '12345678-1234-1234-1234-1234567890ab',
            title: 'test',
            synopsis: 'test',
            price: 1,
            publishedDate: 'new Date()',
            frontPage: 'test',
            author: {
              id: 1,
              name: 'test',
              dateOfBirth: 'new Date()',
              books: [],
              placeOfBirth: 'test',
            },
          },
        },
        {
          id: 2,
          rating: 5,
          comment: 'Great book!',
          user: {
            id: 1,
            name: 'test',
            lastname: 'tre',
            username: 'test',
          },
          book: {
            id: '12345678-1234-1234-1234-1234567890ab',
            title: 'test',
            synopsis: 'test',
            price: 1,
            frontPage: 'test',
            publishedDate: 'new Date()',
            author: {
              id: 1,
              name: 'test',
              dateOfBirth: 'new Date()',
              books: [],
              placeOfBirth: 'test',
            },
          },
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(reviews);

      const result = await controller.findAll();

      expect(result).toBe(reviews);
    });
  });

  describe('findOne', () => {
    it('should return the review with the given ID', async () => {
      const reviewId = '1';

      const review = {
        id: 1,
        rating: 5,
        comment: 'Great book!',
        user: {
          id: 1,
          name: 'test',
          lastname: 'tre',
          username: 'test',
        },
        book: {
          id: '12345678-1234-1234-1234-1234567890ab',
          title: 'test',
          synopsis: 'test',
          price: 1,
          publishedDate: 'new Date()',
          frontPage: 'test',
          author: {
            id: 1,
            name: 'test',
            dateOfBirth: 'new Date()',
            books: [],
            placeOfBirth: 'test',
          },
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(review);

      const result = await controller.findOne(reviewId);

      expect(result).toBe(review);
    });
  });

  describe('update', () => {
    it('should update the review with the given ID', async () => {
      const reviewId = '1';

      const updateReviewDto: UpdateReviewDto = {
        rating: 4,
        comment: 'Updated review',
      };

      const updatedReview = {
        id: 1,
        rating: 5,
        comment: 'Great book!',
        user: {
          id: 1,
          name: 'test',
          lastname: 'tre',
          username: 'test',
        },
        book: {
          id: '12345678-1234-1234-1234-1234567890ab',
          title: 'test',
          synopsis: 'test',
          price: 1,
          frontPage: 'test',
          publishedDate: 'new Date()',
          author: {
            id: 1,
            name: 'test',
            dateOfBirth: 'new Date()',
            books: [],
            placeOfBirth: 'test',
          },
        },
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ ...updatedReview, ...updateReviewDto });

      const result = await controller.update(reviewId, updateReviewDto);

      expect(result).toStrictEqual({
        ...updatedReview,
        rating: 4,
        comment: 'Updated review',
      });
    });
  });

  describe('remove', () => {
    it('should remove the review with the given ID', async () => {
      const reviewId = '1';

      const removedReview = {
        id: 1,
        rating: 5,
        comment: 'Great book!',
        user: {
          id: 1,
          name: 'test',
          lastname: 'tre',
          username: 'test',
        },
        book: {
          id: '12345678-1234-1234-1234-1234567890ab',
          title: 'test',
          synopsis: 'test',
          price: 1,
          publishedDate: 'new Date()',
          frontPage: 'test',
          author: {
            id: 1,
            name: 'test',
            dateOfBirth: 'new Date()',
            books: [],
            placeOfBirth: 'test',
          },
        },
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedReview);

      const result = await controller.remove(reviewId);

      expect(result).toBe(removedReview);
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { UpdateReviewDto } from '../../dto/update-review.dto';
import { Review } from '../../entities/Review.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/User.entity';
import { Book } from '../../entities/Book.entity';
