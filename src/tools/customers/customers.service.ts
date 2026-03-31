import { Injectable } from '@nestjs/common';
import { PaystackService } from '../../paystack/paystack.service';
import type {
  CreateCustomerDto,
  UpdateCustomerDto,
  ValidateCustomerDto,
  SetRiskActionDto,
  DeactivateAuthorizationDto,
  ListCustomersDto,
} from './customers.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly paystack: PaystackService) {}

  async createCustomer(workspaceId: string, dto: CreateCustomerDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/customer', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'createCustomer');
    }
  }

  async listCustomers(workspaceId: string, params: ListCustomersDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get('/customer', { params });
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'listCustomers');
    }
  }

  async fetchCustomer(workspaceId: string, emailOrCode: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/customer/${encodeURIComponent(emailOrCode)}`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'fetchCustomer');
    }
  }

  async updateCustomer(workspaceId: string, code: string, dto: UpdateCustomerDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.put(`/customer/${code}`, dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'updateCustomer');
    }
  }

  async validateCustomer(workspaceId: string, code: string, dto: ValidateCustomerDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post(`/customer/${code}/identification`, dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'validateCustomer');
    }
  }

  async setRiskAction(workspaceId: string, dto: SetRiskActionDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/customer/set_risk_action', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'setRiskAction');
    }
  }

  async deactivateAuthorization(workspaceId: string, dto: DeactivateAuthorizationDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/customer/deactivate_authorization', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'deactivateAuthorization');
    }
  }
}
