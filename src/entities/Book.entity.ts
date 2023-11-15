import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './Author.entity';
import { User } from './User.entity';
import { Review } from './Review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false })
  synopsis: string;
  @Column({ nullable: false })
  publishedDate: string;
  @Column()
  price: number;
  @OneToOne(() => Author, (author) => author.books)
  @Column({ default: 'anonymous' })
  author: Author;
  @ManyToMany(() => User, (user) => user.wishlist)
  users: User[];
  @ManyToOne(() => Review, (review) => review.book)
  reviews: Review[];
}
