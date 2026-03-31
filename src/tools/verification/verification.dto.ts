import { IsString, IsOptional, IsEnum } from 'class-validator';

export class ResolveAccountNumberDto {
  @IsString()
  account_number: string;

  @IsString()
  bank_code: string;
}

export class ListBanksDto {
  @IsOptional()
  @IsString()
  country?: string; // 'nigeria' | 'ghana' | 'south africa' | 'kenya'

  @IsOptional()
  @IsEnum(['nuban', 'ghipss', 'mobile_money', 'basa'])
  type?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  pay_with_bank_transfer?: string;

  @IsOptional()
  @IsString()
  use_cursor?: string;

  @IsOptional()
  @IsString()
  perPage?: string;

  @IsOptional()
  @IsString()
  next?: string;

  @IsOptional()
  @IsString()
  previous?: string;

  @IsOptional()
  @IsString()
  gateway?: string;
}

export class ResolveCardBinDto {
  @IsString()
  bin: string; // first 6 digits of card
}

export class ResolvePhoneNumberDto {
  @IsString()
  phone: string;

  @IsString()
  provider: string; // mobile money provider code
}
