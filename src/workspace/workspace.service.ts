import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { encrypt, decrypt } from '../common/encryption.util';
import type { Environment } from '@prisma/client';

export interface CreateWorkspaceDto {
  name: string;
}

export interface ConnectPaystackDto {
  workspaceId: string;
  secretKey: string;
  environment: Environment;
}

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({
      data: { name: dto.name },
      select: { id: true, name: true, createdAt: true },
    });
  }

  async findById(id: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id },
      select: { id: true, name: true, createdAt: true },
    });
    if (!workspace) throw new NotFoundException(`Workspace ${id} not found`);
    return workspace;
  }

  async list() {
    return this.prisma.workspace.findMany({
      select: { id: true, name: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Saves (or updates) a workspace's Paystack credentials.
   * The secret key is encrypted before storage.
   */
  async connectPaystack(dto: ConnectPaystackDto) {
    const encKey = this.config.getOrThrow<string>('ENCRYPTION_KEY');
    const secretKeyEnc = encrypt(dto.secretKey, encKey);

    return this.prisma.paystackConfig.upsert({
      where: { workspaceId: dto.workspaceId },
      create: {
        workspaceId: dto.workspaceId,
        secretKeyEnc,
        environment: dto.environment,
      },
      update: {
        secretKeyEnc,
        environment: dto.environment,
      },
      select: { id: true, workspaceId: true, environment: true, updatedAt: true },
    });
  }

  /**
   * Decrypts and returns the Paystack secret key for a workspace.
   * Used internally by PaystackService — never exposed via HTTP.
   */
  async getDecryptedPaystackKey(workspaceId: string): Promise<string> {
    // In development, fall back to env var directly
    if (this.config.get('NODE_ENV') === 'development') {
      return this.config.getOrThrow<string>('PAYSTACK_SECRET_KEY');
    }

    const cfg = await this.prisma.paystackConfig.findUnique({
      where: { workspaceId },
    });

    if (!cfg) {
      throw new NotFoundException(
        `No Paystack config found for workspace ${workspaceId}. Connect your Paystack account first.`,
      );
    }

    const encKey = this.config.getOrThrow<string>('ENCRYPTION_KEY');
    return decrypt(cfg.secretKeyEnc, encKey);
  }
}
