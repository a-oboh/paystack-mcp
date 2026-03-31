import { IsString, IsEmail, IsOptional, IsInt, IsPositive } from 'class-validator';

export class CreateSubscriptionDto {
  @IsEmail()
  customer: string; // email or customer code

  @IsString()
  plan: string; // plan code

  @IsOptional()
  @IsString()
  authorization?: string; // authorization code

  @IsOptional()
  @IsString()
  start_date?: string; // ISO 8601
}

export class ToggleSubscriptionDto {
  @IsString()
  code: string; // subscription code

  @IsString()
  token: string; // email token
}

export class ListSubscriptionsDto {
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
  plan?: string;
}
