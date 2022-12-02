import { Injectable } from '@nestjs/common';
import { Loan } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  create(createLoanDto: CreateLoanDto) {
    const withdrawal_date = new Date();

    const return_date = new Date();
    return_date.setDate(return_date.getDate() + 7);

    return this.prisma.loan.create({
      data: {
        ...createLoanDto,
        withdrawal_date,
        return_date,
        renewals_amount: 0,
      },
    });
  }

  findAllFromStudent(studentId: string) {
    return this.prisma.loan.findMany({ where: { studentId: studentId } });
  }

  findOne(id: string) {
    return this.prisma.loan.findUnique({ where: { id } });
  }
}
