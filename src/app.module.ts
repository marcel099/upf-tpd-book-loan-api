import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { GendersModule } from './genders/genders.module';

@Module({
  imports: [PrismaModule, StudentsModule, GendersModule],
})
export class AppModule {}
