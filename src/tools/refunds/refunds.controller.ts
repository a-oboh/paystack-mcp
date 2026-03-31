import { Controller, Post, Get, Body, Param, Query, Req } from '@nestjs/common';
import { RefundsService } from './refunds.service';
import { RequireScopes, Scopes } from '../../auth/scopes.decorator';
import { CreateRefundDto, ListRefundsDto } from './refunds.dto';
import type { WorkspaceRequest } from '../../common/workspace-request.type';

@Controller('tools/refunds')
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Post()
  @RequireScopes(Scopes.REFUNDS_WRITE)
  createRefund(@Req() req: WorkspaceRequest, @Body() dto: CreateRefundDto) {
    return this.refundsService.createRefund(req.workspace.id, dto);
  }

  @Get()
  @RequireScopes(Scopes.REFUNDS_READ)
  listRefunds(@Req() req: WorkspaceRequest, @Query() query: ListRefundsDto) {
    return this.refundsService.listRefunds(req.workspace.id, query);
  }

  @Get(':id')
  @RequireScopes(Scopes.REFUNDS_READ)
  fetchRefund(@Req() req: WorkspaceRequest, @Param('id') id: string) {
    return this.refundsService.fetchRefund(req.workspace.id, id);
  }
}
