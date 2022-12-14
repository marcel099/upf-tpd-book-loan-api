import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { LoanEntity } from './entities/loan.entity';
import { FindManyFromUserQueryDto } from './dto/find-many-from-user-query.dto';
import { PrimaryFieldsDto } from './dto/primary-fields.dto';

@Controller('loans')
@ApiTags('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiCreatedResponse({ type: LoanEntity })
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  @ApiOkResponse({ type: LoanEntity, isArray: true })
  findAllFromStudent(@Query() query: FindManyFromUserQueryDto) {
    return this.loansService.findAllFromStudent(query.student_id);
  }

  @Get(':id')
  @ApiOkResponse({ type: LoanEntity })
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(id);
  }

  @Patch('renew')
  renewLoan(@Query() query: PrimaryFieldsDto) {
    return this.loansService.renewLoan(query);
  }

  @Patch('return')
  returnBook(@Query() query: PrimaryFieldsDto) {
    return this.loansService.returnBook(query);
  }

  @Patch('regularize-financial-situation')
  regularizeLoanFinancialSituation(@Query() query: PrimaryFieldsDto) {
    return this.loansService.regularizeLoanFinancialSituation(query);
  }
}
