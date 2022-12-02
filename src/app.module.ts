import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { GendersModule } from './genders/genders.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [
    PrismaModule,
    AuthorsModule,
    GendersModule,
    BooksModule,
    StudentsModule,
    LoansModule,
  ],
})
export class AppModule {}
