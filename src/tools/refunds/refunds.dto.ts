import { IsString, IsOptional, IsInt, IsPositive } from 'class-validator';

export class CreateRefundDto {
  @IsString()
  transaction: string; // transaction id or reference

  @IsOptional()
  @IsInt()
  @IsPositive()
  amount?: number; // partial refund amount in kobo — omit for full refund

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  customer_note?: string;

  @IsOptional()
  @IsString()
  merchant_note?: string;
}

export class ListRefundsDto {
  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  perPage?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;
}
