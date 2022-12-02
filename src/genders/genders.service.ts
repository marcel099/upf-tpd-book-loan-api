import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Injectable()
export class GendersService {
  constructor(private prisma: PrismaService) {}

  create(createGenderDto: CreateGenderDto) {
    return this.prisma.gender.create({ data: createGenderDto });
  }

  findAll() {
    return this.prisma.gender.findMany();
  }

  findOne(id: string) {
    return this.prisma.gender.findUnique({ where: { id } });
  }

  update(id: string, updateGenderDto: UpdateGenderDto) {
    return this.prisma.gender.update({
      where: { id },
      data: updateGenderDto,
    });
  }

  remove(id: string) {
    return this.prisma.gender.delete({ where: { id } });
  }
}
