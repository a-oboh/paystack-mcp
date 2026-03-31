import { Controller, Post, Get, Body, Param, Query, Req } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { RequireScopes, Scopes } from '../../auth/scopes.decorator';
import {
  InitiateTransferDto,
  FinalizeTransferDto,
  BulkTransferDto,
  ListTransfersDto,
} from './transfers.dto';
import type { WorkspaceRequest } from '../../common/workspace-request.type';

@Controller('tools/transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post()
  @RequireScopes(Scopes.TRANSFERS_WRITE)
  initiateTransfer(@Req() req: WorkspaceRequest, @Body() dto: InitiateTransferDto) {
    return this.transfersService.initiateTransfer(req.workspace.id, dto);
  }

  @Post('finalize')
  @RequireScopes(Scopes.TRANSFERS_WRITE)
  finalizeTransfer(@Req() req: WorkspaceRequest, @Body() dto: FinalizeTransferDto) {
    return this.transfersService.finalizeTransfer(req.workspace.id, dto);
  }

  @Post('bulk')
  @RequireScopes(Scopes.TRANSFERS_WRITE)
  bulkTransfer(@Req() req: WorkspaceRequest, @Body() dto: BulkTransferDto) {
    return this.transfersService.bulkTransfer(req.workspace.id, dto);
  }

  @Get()
  @RequireScopes(Scopes.TRANSFERS_READ)
  listTransfers(@Req() req: WorkspaceRequest, @Query() query: ListTransfersDto) {
    return this.transfersService.listTransfers(req.workspace.id, query);
  }

  @Get('verify/:reference')
  @RequireScopes(Scopes.TRANSFERS_READ)
  verifyTransfer(@Req() req: WorkspaceRequest, @Param('reference') reference: string) {
    return this.transfersService.verifyTransfer(req.workspace.id, reference);
  }

  @Get(':code')
  @RequireScopes(Scopes.TRANSFERS_READ)
  fetchTransfer(@Req() req: WorkspaceRequest, @Param('code') code: string) {
    return this.transfersService.fetchTransfer(req.workspace.id, code);
  }
}
