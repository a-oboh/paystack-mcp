import { IsString, IsOptional, IsInt, IsPositive, IsEnum } from 'class-validator';

export class ListDisputesDto {
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

  @IsOptional()
  @IsString()
  transaction?: string;

  @IsOptional()
  @IsEnum(['awaiting-merchant-feedback', 'awaiting-bank-feedback', 'pending', 'resolved'])
  status?: string;
}

export class ResolveDisputeDto {
  @IsEnum(['merchant-accepted', 'declined'])
  resolution: 'merchant-accepted' | 'declined';

  @IsString()
  message: string;

  @IsInt()
  @IsPositive()
  refund_amount: number;

  @IsOptional()
  @IsString()
  uploaded_filename?: string; // filename from the upload evidence endpoint
}

export class AddEvidenceDto {
  @IsString()
  customer_email: string;

  @IsString()
  customer_name: string;

  @IsString()
  customer_phone: string;

  @IsString()
  service_details: string;

  @IsOptional()
  @IsString()
  delivery_address?: string;

  @IsOptional()
  @IsString()
  delivery_date?: string; // ISO 8601
}
