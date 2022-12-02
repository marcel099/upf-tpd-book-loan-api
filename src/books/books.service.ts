import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookAuthorsIdsDto } from './dto/update-book-authors-ids.dto';
import { UpdateBookGendersIdsDto } from './dto/update-book-genders-ids.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({ data: createBookDto });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: string) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  updateAuthorsIds(
    id: string,
    updateBookAuthorsIdsDto: UpdateBookAuthorsIdsDto,
  ) {
    return this.prisma.book.update({
      where: { id },
      data: { authorsIds: updateBookAuthorsIdsDto.authorsIds },
    });
  }

  updateGendersIds(
    id: string,
    updateBookGendersIdsDto: UpdateBookGendersIdsDto,
  ) {
    return this.prisma.book.update({
      where: { id },
      data: { gendersIds: updateBookGendersIdsDto.gendersIds },
    });
  }

  remove(id: string) {
    return this.prisma.book.delete({ where: { id } });
  }
}
