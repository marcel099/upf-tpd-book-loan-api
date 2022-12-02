import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookAuthorsIdsDto } from './dto/update-book-authors-ids.dto';
import { UpdateBookGendersIdsDto } from './dto/update-book-genders-ids.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiCreatedResponse({ type: BookEntity })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: BookEntity })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Patch(':id/authors')
  @ApiOkResponse({ type: BookEntity })
  updateAuthorsIds(
    @Param('id') id: string,
    @Body() updateBookAuthorsIdsDto: UpdateBookAuthorsIdsDto,
  ) {
    return this.booksService.updateAuthorsIds(id, updateBookAuthorsIdsDto);
  }

  @Patch(':id/genders')
  @ApiOkResponse({ type: BookEntity })
  updateGendersIds(
    @Param('id') id: string,
    @Body() updateBookGendersIdsDto: UpdateBookGendersIdsDto,
  ) {
    return this.booksService.updateGendersIds(id, updateBookGendersIdsDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BookEntity })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
