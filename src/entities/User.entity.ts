import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book.entity';
import { Review } from './Review.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  lastname: string;
  @Column({ nullable: false, unique: true })
  username: string;
  @ManyToMany(() => Book, { cascade: true })
  @JoinTable()
  wishlist?: Book[];
  @OneToMany(() => Review, (review) => review.user)
  reviews?: Review[];
}
