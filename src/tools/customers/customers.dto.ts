import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsObject,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class ValidateCustomerDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  type: string; // 'bank_account' | 'bvn'

  @IsString()
  country: string;

  @IsString()
  bvn: string;

  @IsOptional()
  @IsString()
  bank_code?: string;

  @IsOptional()
  @IsString()
  account_number?: string;
}

export class SetRiskActionDto {
  @IsString()
  customer: string; // customer code or email

  @IsEnum(['default', 'allow', 'deny'])
  risk_action: 'default' | 'allow' | 'deny';
}

export class DeactivateAuthorizationDto {
  @IsString()
  authorization_code: string;
}

export class ListCustomersDto {
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
