import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateLoanDto {
  // @IsDateString()
  // @ApiProperty()
  // withdrawal_date: string;

  // @IsDateString()
  // @ApiProperty()
  // return_date: string;

  // @IsNumber()
  // @ApiProperty()
  // renewals_amount: number;

  @IsString()
  @IsMongoId()
  @ApiProperty()
  bookId: string;

  @IsString()
  @IsMongoId()
  @ApiProperty()
  studentId: string;
}
