import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { GendersModule } from './genders/genders.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [PrismaModule, AuthorsModule, GendersModule, StudentsModule],
})
export class AppModule {}
