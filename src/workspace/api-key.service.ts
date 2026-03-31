import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createHash, randomBytes } from 'crypto';
import type { ApiKey, Environment } from '@prisma/client';

export interface CreatedApiKey {
  // The raw key — returned ONCE, never stored
  rawKey: string;
  // Safe to store/display
  prefix: string;
  id: string;
}

export interface CreateApiKeyDto {
  workspaceId: string;
  displayName: string;
  scopes: string[];
  environment: Environment;
  expiresAt?: Date;
}

@Injectable()
export class ApiKeyService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generates a new API key for a workspace.
   * Returns the raw key exactly once — it is not stored.
   */
  async create(dto: CreateApiKeyDto): Promise<CreatedApiKey> {
    const env = dto.environment === 'LIVE' ? 'live' : 'test';
    const random = randomBytes(32).toString('base64url');
    const rawKey = `pmcp_${env}_${random}`;

    // Store the first 16 chars as a human-readable prefix for UI identification
    const prefix = rawKey.slice(0, 16);
    const keyHash = createHash('sha256').update(rawKey).digest('hex');

    const apiKey = await this.prisma.apiKey.create({
      data: {
        workspaceId: dto.workspaceId,
        displayName: dto.displayName,
        scopes: dto.scopes,
        keyHash,
        prefix,
        expiresAt: dto.expiresAt ?? null,
      },
    });

    return { rawKey, prefix, id: apiKey.id };
  }

  /**
   * Looks up an ApiKey by its SHA-256 hash.
   * Used by the guard on every request.
   */
  async findByHash(keyHash: string): Promise<(ApiKey & { workspace: { id: string; name: string } }) | null> {
    return this.prisma.apiKey.findUnique({
      where: { keyHash },
      include: { workspace: { select: { id: true, name: true } } },
    });
  }

  /**
   * Lists all active (non-revoked) keys for a workspace.
   * Never returns keyHash — only safe display fields.
   */
  async listForWorkspace(workspaceId: string) {
    return this.prisma.apiKey.findMany({
      where: { workspaceId, revokedAt: null },
      select: {
        id: true,
        prefix: true,
        displayName: true,
        scopes: true,
        lastUsedAt: true,
        expiresAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Revokes a key immediately. Subsequent requests with this key will 401.
   */
  async revoke(id: string, workspaceId: string): Promise<void> {
    const key = await this.prisma.apiKey.findFirst({ where: { id, workspaceId } });
    if (!key) throw new NotFoundException('API key not found');

    await this.prisma.apiKey.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  }

  /**
   * Fire-and-forget lastUsedAt update.
   * Called after successful auth — must not throw or block.
   */
  async touchLastUsed(id: string): Promise<void> {
    try {
      await this.prisma.apiKey.update({
        where: { id },
        data: { lastUsedAt: new Date() },
      });
    } catch {
      // Non-critical — don't propagate
    }
  }
}
