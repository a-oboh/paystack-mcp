import { Injectable } from '@nestjs/common';
import { PaystackService } from '../../paystack/paystack.service';
import type {
  CreateSubscriptionDto,
  ToggleSubscriptionDto,
  ListSubscriptionsDto,
} from './subscriptions.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly paystack: PaystackService) {}

  async createSubscription(workspaceId: string, dto: CreateSubscriptionDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/subscription', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'createSubscription');
    }
  }

  async listSubscriptions(workspaceId: string, params: ListSubscriptionsDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get('/subscription', { params });
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'listSubscriptions');
    }
  }

  async fetchSubscription(workspaceId: string, idOrCode: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/subscription/${encodeURIComponent(idOrCode)}`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'fetchSubscription');
    }
  }

  async enableSubscription(workspaceId: string, dto: ToggleSubscriptionDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/subscription/enable', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'enableSubscription');
    }
  }

  async disableSubscription(workspaceId: string, dto: ToggleSubscriptionDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/subscription/disable', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'disableSubscription');
    }
  }

  async listSubscriptionTransactions(workspaceId: string, idOrCode: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/subscription/${encodeURIComponent(idOrCode)}/transactions`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'listSubscriptionTransactions');
    }
  }
}
