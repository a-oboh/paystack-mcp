import { Controller, Post, Get, Body, Param, Query, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RequireScopes, Scopes } from '../../auth/scopes.decorator';
import {
  InitializeTransactionDto,
  ListTransactionsDto,
  ChargeAuthorizationDto,
} from './payments.dto';
import type { WorkspaceRequest } from '../../common/workspace-request.type';

@Controller('tools/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initialize')
  @RequireScopes(Scopes.PAYMENTS_WRITE)
  initializeTransaction(@Req() req: WorkspaceRequest, @Body() dto: InitializeTransactionDto) {
    return this.paymentsService.initializeTransaction(req.workspace.id, dto);
  }

  @Get('verify/:reference')
  @RequireScopes(Scopes.PAYMENTS_READ)
  verifyTransaction(@Req() req: WorkspaceRequest, @Param('reference') reference: string) {
    return this.paymentsService.verifyTransaction(req.workspace.id, reference);
  }

  @Get()
  @RequireScopes(Scopes.PAYMENTS_READ)
  listTransactions(@Req() req: WorkspaceRequest, @Query() query: ListTransactionsDto) {
    return this.paymentsService.listTransactions(req.workspace.id, query);
  }

  @Get('totals')
  @RequireScopes(Scopes.PAYMENTS_READ)
  getTransactionTotals(@Req() req: WorkspaceRequest) {
    return this.paymentsService.getTransactionTotals(req.workspace.id);
  }

  @Get('export')
  @RequireScopes(Scopes.PAYMENTS_READ)
  exportTransactions(@Req() req: WorkspaceRequest, @Query() query: ListTransactionsDto) {
    return this.paymentsService.exportTransactions(req.workspace.id, query);
  }

  @Get(':id')
  @RequireScopes(Scopes.PAYMENTS_READ)
  fetchTransaction(@Req() req: WorkspaceRequest, @Param('id') id: string) {
    return this.paymentsService.fetchTransaction(req.workspace.id, id);
  }

  @Post('charge-authorization')
  @RequireScopes(Scopes.PAYMENTS_WRITE)
  chargeAuthorization(@Req() req: WorkspaceRequest, @Body() dto: ChargeAuthorizationDto) {
    return this.paymentsService.chargeAuthorization(req.workspace.id, dto);
  }
}
