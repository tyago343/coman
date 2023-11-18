import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book.entity';
import { User } from './User.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  rating: number;
  @Column({ nullable: false })
  comment: string;
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
  @ManyToOne(() => Book, (book) => book.reviews)
  book: Book;
}
