import { Controller, Post, Get, Put, Body, Param, Query, Req } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { RequireScopes, Scopes } from '../../auth/scopes.decorator';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  ValidateCustomerDto,
  SetRiskActionDto,
  DeactivateAuthorizationDto,
  ListCustomersDto,
} from './customers.dto';
import type { WorkspaceRequest } from '../../common/workspace-request.type';

@Controller('tools/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @RequireScopes(Scopes.CUSTOMERS_WRITE)
  createCustomer(@Req() req: WorkspaceRequest, @Body() dto: CreateCustomerDto) {
    return this.customersService.createCustomer(req.workspace.id, dto);
  }

  @Get()
  @RequireScopes(Scopes.CUSTOMERS_READ)
  listCustomers(@Req() req: WorkspaceRequest, @Query() query: ListCustomersDto) {
    return this.customersService.listCustomers(req.workspace.id, query);
  }

  @Get(':emailOrCode')
  @RequireScopes(Scopes.CUSTOMERS_READ)
  fetchCustomer(@Req() req: WorkspaceRequest, @Param('emailOrCode') emailOrCode: string) {
    return this.customersService.fetchCustomer(req.workspace.id, emailOrCode);
  }

  @Put(':code')
  @RequireScopes(Scopes.CUSTOMERS_WRITE)
  updateCustomer(
    @Req() req: WorkspaceRequest,
    @Param('code') code: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customersService.updateCustomer(req.workspace.id, code, dto);
  }

  @Post(':code/validate')
  @RequireScopes(Scopes.CUSTOMERS_WRITE)
  validateCustomer(
    @Req() req: WorkspaceRequest,
    @Param('code') code: string,
    @Body() dto: ValidateCustomerDto,
  ) {
    return this.customersService.validateCustomer(req.workspace.id, code, dto);
  }

  @Post('set-risk-action')
  @RequireScopes(Scopes.CUSTOMERS_WRITE)
  setRiskAction(@Req() req: WorkspaceRequest, @Body() dto: SetRiskActionDto) {
    return this.customersService.setRiskAction(req.workspace.id, dto);
  }

  @Post('deactivate-authorization')
  @RequireScopes(Scopes.CUSTOMERS_WRITE)
  deactivateAuthorization(
    @Req() req: WorkspaceRequest,
    @Body() dto: DeactivateAuthorizationDto,
  ) {
    return this.customersService.deactivateAuthorization(req.workspace.id, dto);
  }
}
