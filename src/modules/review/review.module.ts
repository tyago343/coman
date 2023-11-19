import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../../entities/Review.entity';
import { User } from '../../entities/User.entity';
import { Book } from '../../entities/Book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Book])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
