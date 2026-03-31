import { Injectable } from '@nestjs/common';
import { PaystackService } from '../../paystack/paystack.service';
import type {
  InitiateTransferDto,
  FinalizeTransferDto,
  BulkTransferDto,
  ListTransfersDto,
} from './transfers.dto';

@Injectable()
export class TransfersService {
  constructor(private readonly paystack: PaystackService) {}

  async initiateTransfer(workspaceId: string, dto: InitiateTransferDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/transfer', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'initiateTransfer');
    }
  }

  async finalizeTransfer(workspaceId: string, dto: FinalizeTransferDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/transfer/finalize_transfer', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'finalizeTransfer');
    }
  }

  async bulkTransfer(workspaceId: string, dto: BulkTransferDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post('/transfer/bulk', dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'bulkTransfer');
    }
  }

  async listTransfers(workspaceId: string, params: ListTransfersDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get('/transfer', { params });
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'listTransfers');
    }
  }

  async fetchTransfer(workspaceId: string, code: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/transfer/${code}`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'fetchTransfer');
    }
  }

  async verifyTransfer(workspaceId: string, reference: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/transfer/verify/${encodeURIComponent(reference)}`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'verifyTransfer');
    }
  }
}
