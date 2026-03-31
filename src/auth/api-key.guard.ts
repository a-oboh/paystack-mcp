import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import { IS_PUBLIC_KEY } from './public.decorator';
import { SCOPES_KEY } from './scopes.decorator';
import { ApiKeyService } from '../workspace/api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // Allow routes marked @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (isPublic) return true;

    // Bypass auth entirely in local development
    if (this.configService.get('NODE_ENV') === 'development') {
      // Still attach a mock workspace so downstream services don't break
      const req = ctx.switchToHttp().getRequest();
      req.workspace = { id: 'dev-workspace', name: 'Local Dev' };
      return true;
    }

    const req = ctx.switchToHttp().getRequest();
    const token = this.extractBearer(req);

    if (!token) {
      throw new UnauthorizedException('Missing API key. Pass it as: Authorization: Bearer <key>');
    }

    // Hash the incoming token and look it up
    const keyHash = createHash('sha256').update(token).digest('hex');
    const apiKey = await this.apiKeyService.findByHash(keyHash);

    if (!apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    if (apiKey.revokedAt) {
      throw new UnauthorizedException('This API key has been revoked');
    }

    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      throw new UnauthorizedException('This API key has expired');
    }

    // Check required scopes for this specific handler
    const requiredScopes = this.reflector.getAllAndOverride<string[]>(SCOPES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (requiredScopes?.length) {
      const missingScopes = requiredScopes.filter((s) => !apiKey.scopes.includes(s));
      if (missingScopes.length > 0) {
        throw new ForbiddenException(
          `Insufficient scopes. Missing: ${missingScopes.join(', ')}`,
        );
      }
    }

    // Attach workspace to request — available in all handlers via @Req()
    req.workspace = apiKey.workspace;

    // Update lastUsedAt without blocking the request
    void this.apiKeyService.touchLastUsed(apiKey.id);

    return true;
  }

  private extractBearer(req: Record<string, any>): string | null {
    const authHeader = req.headers?.authorization as string | undefined;
    if (!authHeader?.startsWith('Bearer ')) return null;
    return authHeader.slice(7).trim() || null;
  }
}
