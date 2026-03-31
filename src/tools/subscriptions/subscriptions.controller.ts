import { Controller, Post, Get, Body, Param, Query, Req } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { RequireScopes, Scopes } from '../../auth/scopes.decorator';
import {
  CreateSubscriptionDto,
  ToggleSubscriptionDto,
  ListSubscriptionsDto,
} from './subscriptions.dto';
import type { WorkspaceRequest } from '../../common/workspace-request.type';

@Controller('tools/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @RequireScopes(Scopes.SUBSCRIPTIONS_WRITE)
  createSubscription(@Req() req: WorkspaceRequest, @Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.createSubscription(req.workspace.id, dto);
  }

  @Get()
  @RequireScopes(Scopes.SUBSCRIPTIONS_READ)
  listSubscriptions(@Req() req: WorkspaceRequest, @Query() query: ListSubscriptionsDto) {
    return this.subscriptionsService.listSubscriptions(req.workspace.id, query);
  }

  @Get(':idOrCode')
  @RequireScopes(Scopes.SUBSCRIPTIONS_READ)
  fetchSubscription(@Req() req: WorkspaceRequest, @Param('idOrCode') idOrCode: string) {
    return this.subscriptionsService.fetchSubscription(req.workspace.id, idOrCode);
  }

  @Get(':idOrCode/transactions')
  @RequireScopes(Scopes.SUBSCRIPTIONS_READ)
  listSubscriptionTransactions(
    @Req() req: WorkspaceRequest,
    @Param('idOrCode') idOrCode: string,
  ) {
    return this.subscriptionsService.listSubscriptionTransactions(req.workspace.id, idOrCode);
  }

  @Post('enable')
  @RequireScopes(Scopes.SUBSCRIPTIONS_WRITE)
  enableSubscription(@Req() req: WorkspaceRequest, @Body() dto: ToggleSubscriptionDto) {
    return this.subscriptionsService.enableSubscription(req.workspace.id, dto);
  }

  @Post('disable')
  @RequireScopes(Scopes.SUBSCRIPTIONS_WRITE)
  disableSubscription(@Req() req: WorkspaceRequest, @Body() dto: ToggleSubscriptionDto) {
    return this.subscriptionsService.disableSubscription(req.workspace.id, dto);
  }
}
