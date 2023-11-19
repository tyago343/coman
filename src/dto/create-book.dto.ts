import { Author } from '../entities/Author.entity';

export class CreateBookDto {
  readonly title: string;
  readonly synopsis: string;
  readonly publishedDate: string;
  readonly price: number;
  readonly author: Author;
}
