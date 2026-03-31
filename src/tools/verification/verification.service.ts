import { Injectable } from '@nestjs/common';
import { PaystackService } from '../../paystack/paystack.service';
import type {
  ResolveAccountNumberDto,
  ListBanksDto,
  ResolveCardBinDto,
} from './verification.dto';

@Injectable()
export class VerificationService {
  constructor(private readonly paystack: PaystackService) {}

  async resolveAccountNumber(workspaceId: string, params: ResolveAccountNumberDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get('/bank/resolve', { params });
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'resolveAccountNumber');
    }
  }

  async listBanks(workspaceId: string, params: ListBanksDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get('/bank', { params });
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'listBanks');
    }
  }

  async resolveCardBin(workspaceId: string, bin: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/decision/bin/${bin}`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'resolveCardBin');
    }
  }
}
