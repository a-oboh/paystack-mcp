import { IsString, IsNotEmpty, IsEnum, IsOptional, IsArray, IsDateString, MinLength, MaxLength } from 'class-validator';
import { Environment } from '@prisma/client';
import { Scope } from '../auth/scopes.decorator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}

export class ConnectPaystackDto {
  @IsString()
  @IsNotEmpty()
  secretKey: string;

  @IsEnum(Environment)
  environment: Environment;
}

export class CreateApiKeyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  displayName: string;

  @IsArray()
  @IsString({ each: true })
  scopes: Scope[];

  @IsEnum(Environment)
  environment: Environment;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class RevokeApiKeyDto {
  @IsString()
  @IsNotEmpty()
  keyId: string;
}
