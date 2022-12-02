import { Injectable } from '@nestjs/common';
import { Loan } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { PrimaryFieldsDto } from './dto/primary-fields.dto';

interface LoanFinancialSituation {
  isIrregular: boolean;
  currentDebt: number;
}

const milisecondsInADay = 1000 * 60 * 60 * 24;

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  private fineAmount = 1;

  create(createLoanDto: CreateLoanDto) {
    const withdrawal_date = new Date();

    return this.prisma.loan.create({
      data: {
        ...createLoanDto,
        withdrawal_date,
        renewals_amount: 0,
      },
    });
  }

  findAllFromStudent(studentId: string) {
    return this.prisma.loan.findMany({
      where: { studentId: studentId },
      orderBy: [{ withdrawal_date: 'desc' }],
    });
  }

  findOne(id: string) {
    return this.prisma.loan.findUnique({ where: { id } });
  }

  private async findCurrentBookLoan(primaryFieldsDto: PrimaryFieldsDto) {
    return await this.prisma.loan.findFirst({
      where: {
        studentId: primaryFieldsDto.student_id,
        bookId: primaryFieldsDto.book_id,
      },
      orderBy: [
        {
          withdrawal_date: 'desc',
        },
      ],
    });
  }

  private discoverLatestRenewalIndex(loan: Loan) {
    let latestRenewalDateString = '';
    let latestRenewalIndex = -1;

    loan.renewals.forEach((renewal, idx) => {
      const renewalDateString = renewal.renewal_date.toJSON();
      if (latestRenewalDateString < renewalDateString) {
        latestRenewalDateString = renewalDateString;
        latestRenewalIndex = idx;
      }
    });

    return latestRenewalIndex;
  }

  private async discoverDateTorReturnBook(loan: Loan) {
    let dateToReturn: Date | null = null;

    if (loan.renewals.length === 0) {
      dateToReturn = new Date(loan.withdrawal_date);
    } else {
      const latestRenewalIndex = this.discoverLatestRenewalIndex(loan);
      const dateToReturnString =
        loan.renewals[latestRenewalIndex].renewal_date.toJSON();
      dateToReturn = new Date(dateToReturnString);
    }

    dateToReturn.setDate(dateToReturn.getDate() + 7);

    return dateToReturn;
  }

  private async getLoanFinancialSituation(
    bookLoan: Loan,
  ): Promise<LoanFinancialSituation> {
    const currentDate = new Date();
    const dateToReturn = await this.discoverDateTorReturnBook(bookLoan);

    if (dateToReturn.getTime() < currentDate.getTime()) {
      // return dateToReturn;
      const differenceInMiliseconds =
        currentDate.getTime() - dateToReturn.getTime();

      const differenceInDays = Math.floor(
        differenceInMiliseconds / milisecondsInADay,
      );

      return {
        isIrregular: true,
        currentDebt: differenceInDays * this.fineAmount,
      };
    } else {
      return {
        isIrregular: false,
        currentDebt: 0,
      };
    }
  }

  async renewLoan(primaryFieldsDto: PrimaryFieldsDto) {
    const bookLoan = await this.findCurrentBookLoan(primaryFieldsDto);

    if (bookLoan.return_date === null) {
      return;
    }

    const { isIrregular, currentDebt } = await this.getLoanFinancialSituation(
      bookLoan,
    );

    if (isIrregular === true) {
      return `Loan in irregular situation. Student must pay $${currentDebt}.`;
    }

    const currentDate = new Date();

    if (bookLoan.renewals.length > 0) {
      const latestRenewalIndex = this.discoverLatestRenewalIndex(bookLoan);
      bookLoan.renewals[latestRenewalIndex].return_date = currentDate;
    }

    bookLoan.renewals.push({
      renewal_date: currentDate,
      return_date: null,
      fine_payment_date: null,
      fine_value: null,
    });

    await this.prisma.loan.update({
      where: {
        id: bookLoan.id,
      },
      data: {
        renewals: bookLoan.renewals,
      },
    });
  }

  async returnBook(primaryFieldsDto: PrimaryFieldsDto) {
    const bookLoan = await this.findCurrentBookLoan(primaryFieldsDto);

    if (bookLoan.return_date === null) {
      return;
    }

    const currentDate = new Date();

    const latestRenewalIndex = this.discoverLatestRenewalIndex(bookLoan);
    console.log(bookLoan.renewals[latestRenewalIndex]);
    console.log(bookLoan.renewals[0]);
    console.log(bookLoan.renewals[1]);
    bookLoan.renewals[latestRenewalIndex].return_date = currentDate;

    await this.prisma.loan.update({
      where: {
        id: bookLoan.id,
      },
      data: {
        return_date: currentDate,
        renewals: bookLoan.renewals,
      },
    });
  }

  async regularizeLoanFinancialSituation(primaryFieldsDto: PrimaryFieldsDto) {
    const bookLoan = await this.findCurrentBookLoan(primaryFieldsDto);

    if (bookLoan.return_date === null) {
      return;
    }

    const { isIrregular, currentDebt } = await this.getLoanFinancialSituation(
      bookLoan,
    );

    if (isIrregular) {
      const currentDate = new Date();

      const latestRenewalIndex = this.discoverLatestRenewalIndex(bookLoan);
      bookLoan.renewals[latestRenewalIndex].fine_value = currentDebt;
      bookLoan.renewals[latestRenewalIndex].fine_payment_date = currentDate;

      await this.prisma.loan.update({
        where: {
          id: bookLoan.id,
        },
        data: {
          renewals: bookLoan.renewals,
        },
      });
    }
  }
}
