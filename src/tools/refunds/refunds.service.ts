import { Injectable } from '@nestjs/common';
import { PaystackService } from '../../paystack/paystack.service';
import type { CreateRefundDto, ListRefundsDto } from './refunds.dto';

@Injectable()
export class RefundsService {
  constructor(private readonly paystack: PaystackService) {}

  async createRefund(workspaceId: string, dto: CreateRefundDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/refund', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'createRefund');
    }
  }

  async listRefunds(workspaceId: string, params: ListRefundsDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get('/refund', { params });
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'listRefunds');
    }
  }

  async fetchRefund(workspaceId: string, id: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/refund/${id}`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'fetchRefund');
    }
  }
}
