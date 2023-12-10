import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from '../../dto/create-book.dto';
import { UpdateBookDto } from '../../dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { GooglePassportGuard } from '../../guards/google.passport.guard';
import { Express } from 'express';
import { SearchBookDto } from '../../dto/search-book.dto';
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseInterceptors(FileInterceptor('frontPage'))
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bookService.create({ createBookDto, file });
  }

  @Get()
  // @UseGuards(GooglePassportGuard)
  findAll() {
    return this.bookService.findAll();
  }
  @Get('search')
  search(
    @Query()
    params: SearchBookDto,
  ) {
    return this.bookService.search(params);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
