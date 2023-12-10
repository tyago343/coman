import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class SearchBookDto extends PartialType(CreateBookDto) {
  minPrice?: number;
  maxPrice?: number;
  frontPage?: boolean;
}
