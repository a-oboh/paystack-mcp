import { Injectable } from '@nestjs/common';
import { PaystackService } from '../../paystack/paystack.service';
import type {
  InitializeTransactionDto,
  ListTransactionsDto,
  ChargeAuthorizationDto,
} from './payments.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly paystack: PaystackService) {}

  async initializeTransaction(workspaceId: string, dto: InitializeTransactionDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/transaction/initialize', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'initializeTransaction');
    }
  }

  async verifyTransaction(workspaceId: string, reference: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/transaction/verify/${encodeURIComponent(reference)}`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'verifyTransaction');
    }
  }

  async listTransactions(workspaceId: string, params: ListTransactionsDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get('/transaction', { params });
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'listTransactions');
    }
  }

  async fetchTransaction(workspaceId: string, id: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/transaction/${id}`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'fetchTransaction');
    }
  }

  async chargeAuthorization(workspaceId: string, dto: ChargeAuthorizationDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/transaction/charge_authorization', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'chargeAuthorization');
    }
  }

  async getTransactionTotals(workspaceId: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get('/transaction/totals');
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'getTransactionTotals');
    }
  }

  async exportTransactions(workspaceId: string, params: ListTransactionsDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get('/transaction/export', { params });
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'exportTransactions');
    }
  }
}
