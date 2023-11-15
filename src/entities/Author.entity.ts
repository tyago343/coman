import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  placeOfBirth: string;
  @Column({ nullable: false })
  dateOfBirth: string;
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
