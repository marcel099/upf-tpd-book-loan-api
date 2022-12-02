import { Module } from '@nestjs/common';

import { GendersService } from './genders.service';
import { GendersController } from './genders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GendersController],
  providers: [GendersService],
  imports: [PrismaModule],
})
export class GendersModule {}
