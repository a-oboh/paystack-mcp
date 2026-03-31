import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { RequireScopes, Scopes } from '../../auth/scopes.decorator';
import { ResolveAccountNumberDto, ListBanksDto } from './verification.dto';
import type { WorkspaceRequest } from '../../common/workspace-request.type';

@Controller('tools/verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Get('resolve-account')
  @RequireScopes(Scopes.VERIFICATION_READ)
  resolveAccountNumber(
    @Req() req: WorkspaceRequest,
    @Query() query: ResolveAccountNumberDto,
  ) {
    return this.verificationService.resolveAccountNumber(req.workspace.id, query);
  }

  @Get('banks')
  @RequireScopes(Scopes.VERIFICATION_READ)
  listBanks(@Req() req: WorkspaceRequest, @Query() query: ListBanksDto) {
    return this.verificationService.listBanks(req.workspace.id, query);
  }

  @Get('card-bin/:bin')
  @RequireScopes(Scopes.VERIFICATION_READ)
  resolveCardBin(@Req() req: WorkspaceRequest, @Param('bin') bin: string) {
    return this.verificationService.resolveCardBin(req.workspace.id, bin);
  }
}
