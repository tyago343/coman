import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { UpdateReviewDto } from '../../dto/update-review.dto';
import { Review } from '../../entities/Review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';
import { Book } from '../../entities/Book.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const user = await this.userRepository.findOne({
      where: {
        id: +createReviewDto.userId,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const book = await this.bookRepository.findOne({
      where: {
        id: createReviewDto.bookId,
      },
    });
    if (!book) {
      throw new Error('Book not found');
    }
    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
      book,
    });
    return await this.reviewRepository.save(review);
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    let book;
    let user;

    if (updateReviewDto.bookId) {
      book = await this.bookRepository.findOne({
        where: {
          id: updateReviewDto.bookId,
        },
      });
      if (!book) {
        throw new Error('Book not found');
      }
    }

    if (updateReviewDto.userId) {
      user = await this.userRepository.findOne({
        where: {
          id: +updateReviewDto.userId,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
    }

    const updatedReview = {
      ...updateReviewDto,
      user,
      book,
    };

    await this.reviewRepository.update(id, updatedReview);

    const updatedReviewEntity = await this.reviewRepository.findOne({
      where: { id },
      relations: { user: true, book: true },
    });

    return updatedReviewEntity;
  }

  async remove(id: number) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new Error('Review not found');
    }
    return await this.reviewRepository.remove(review);
  }
}
