import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { ApiKeyService } from './api-key.service';
import { Public } from '../auth/public.decorator';
import { RequireScopes } from '../auth/scopes.decorator';
import {
  CreateWorkspaceDto,
  ConnectPaystackDto,
  CreateApiKeyDto,
} from './workspace.dto';
import type { WorkspaceRequest } from '../common/workspace-request.type';
import type { Environment } from '@prisma/client';

@Controller('workspaces')
export class WorkspaceController {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  // ─── Workspace CRUD ───────────────────────────────────────────────────────

  @Public()
  @Post()
  createWorkspace(@Body() dto: CreateWorkspaceDto) {
    return this.workspaceService.create(dto);
  }

  @Get(':id')
  getWorkspace(@Param('id') id: string) {
    return this.workspaceService.findById(id);
  }

  // ─── Paystack Config ──────────────────────────────────────────────────────

  @Post(':id/paystack')
  connectPaystack(@Param('id') id: string, @Body() dto: ConnectPaystackDto) {
    return this.workspaceService.connectPaystack({
      workspaceId: id,
      secretKey: dto.secretKey,
      environment: dto.environment,
    });
  }

  // ─── API Key Management ───────────────────────────────────────────────────

  @Post(':id/api-keys')
  async createApiKey(@Param('id') id: string, @Body() dto: CreateApiKeyDto) {
    const result = await this.apiKeyService.create({
      workspaceId: id,
      displayName: dto.displayName,
      scopes: dto.scopes,
      environment: dto.environment as Environment,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
    });

    return {
      id: result.id,
      prefix: result.prefix,
      // rawKey is returned ONCE here — client must save it
      key: result.rawKey,
      message: 'Save this key securely. It will not be shown again.',
    };
  }

  @Get(':id/api-keys')
  listApiKeys(@Param('id') id: string) {
    return this.apiKeyService.listForWorkspace(id);
  }

  @Delete(':id/api-keys/:keyId')
  @HttpCode(HttpStatus.NO_CONTENT)
  revokeApiKey(@Param('id') id: string, @Param('keyId') keyId: string) {
    return this.apiKeyService.revoke(keyId, id);
  }
}
