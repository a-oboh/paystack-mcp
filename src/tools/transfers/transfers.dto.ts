import { IsString, IsInt, IsPositive, IsOptional, IsArray, IsObject } from 'class-validator';

export class InitiateTransferDto {
  @IsString()
  source: string; // always 'balance' for now

  @IsInt()
  @IsPositive()
  amount: number;

  @IsString()
  recipient: string; // transfer recipient code

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  reference?: string;
}

export class FinalizeTransferDto {
  @IsString()
  transfer_code: string;

  @IsString()
  otp: string;
}

export class BulkTransferItemDto {
  @IsString()
  source: string;

  @IsInt()
  @IsPositive()
  amount: number;

  @IsString()
  recipient: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  reference?: string;
}

export class BulkTransferDto {
  @IsString()
  source: string;

  @IsArray()
  transfers: BulkTransferItemDto[];
}

export class ListTransfersDto {
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
