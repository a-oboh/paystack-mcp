import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsEnum,
  IsObject,
  Min,
  IsInt,
  IsPositive,
} from 'class-validator';

export type PaystackCurrency = 'NGN' | 'GHS' | 'ZAR' | 'USD' | 'KES';

export class InitializeTransactionDto {
  @IsEmail()
  email: string;

  // Amount in kobo (NGN), pesewas (GHS), or cents (USD)
  @IsInt()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  currency?: PaystackCurrency;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  callback_url?: string;

  @IsOptional()
  @IsString()
  plan?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class VerifyTransactionDto {
  @IsString()
  reference: string;
}

export class ListTransactionsDto {
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
  customer?: string;

  @IsOptional()
  @IsString()
  status?: 'failed' | 'success' | 'abandoned';

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;
}

export class ChargeAuthorizationDto {
  @IsEmail()
  email: string;

  @IsInt()
  @IsPositive()
  amount: number;

  @IsString()
  authorization_code: string;

  @IsOptional()
  @IsString()
  currency?: PaystackCurrency;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
