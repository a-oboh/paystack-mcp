import { Controller, Get, Post, Put, Body, Param, Query, Req } from '@nestjs/common';
import { DisputesService } from './disputes.service';
import { RequireScopes, Scopes } from '../../auth/scopes.decorator';
import { ListDisputesDto, ResolveDisputeDto, AddEvidenceDto } from './disputes.dto';
import type { WorkspaceRequest } from '../../common/workspace-request.type';

@Controller('tools/disputes')
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Get()
  @RequireScopes(Scopes.DISPUTES_READ)
  listDisputes(@Req() req: WorkspaceRequest, @Query() query: ListDisputesDto) {
    return this.disputesService.listDisputes(req.workspace.id, query);
  }

  @Get(':id')
  @RequireScopes(Scopes.DISPUTES_READ)
  fetchDispute(@Req() req: WorkspaceRequest, @Param('id') id: string) {
    return this.disputesService.fetchDispute(req.workspace.id, id);
  }

  @Get(':id/messages')
  @RequireScopes(Scopes.DISPUTES_READ)
  listDisputeMessages(@Req() req: WorkspaceRequest, @Param('id') id: string) {
    return this.disputesService.listDisputeMessages(req.workspace.id, id);
  }

  @Get(':id/evidence')
  @RequireScopes(Scopes.DISPUTES_READ)
  listDisputeEvidence(@Req() req: WorkspaceRequest, @Param('id') id: string) {
    return this.disputesService.listDisputeEvidence(req.workspace.id, id);
  }

  @Post(':id/evidence')
  @RequireScopes(Scopes.DISPUTES_WRITE)
  addEvidence(
    @Req() req: WorkspaceRequest,
    @Param('id') id: string,
    @Body() dto: AddEvidenceDto,
  ) {
    return this.disputesService.addEvidence(req.workspace.id, id, dto);
  }

  @Put(':id/resolve')
  @RequireScopes(Scopes.DISPUTES_WRITE)
  resolveDispute(
    @Req() req: WorkspaceRequest,
    @Param('id') id: string,
    @Body() dto: ResolveDisputeDto,
  ) {
    return this.disputesService.resolveDispute(req.workspace.id, id, dto);
  }

  @Put(':id/accept')
  @RequireScopes(Scopes.DISPUTES_WRITE)
  acceptDisputeCharge(@Req() req: WorkspaceRequest, @Param('id') id: string) {
    return this.disputesService.acceptDisputeCharge(req.workspace.id, id);
  }
}
