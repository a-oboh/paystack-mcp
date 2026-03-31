import { Injectable } from '@nestjs/common';
import { PaystackService } from '../../paystack/paystack.service';
import type { ListDisputesDto, ResolveDisputeDto, AddEvidenceDto } from './disputes.dto';

@Injectable()
export class DisputesService {
  constructor(private readonly paystack: PaystackService) {}

  async listDisputes(workspaceId: string, params: ListDisputesDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get('/dispute', { params });
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'listDisputes');
    }
  }

  async fetchDispute(workspaceId: string, id: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/dispute/${id}`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'fetchDispute');
    }
  }

  async listDisputeMessages(workspaceId: string, id: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/dispute/${id}/messages`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'listDisputeMessages');
    }
  }

  async listDisputeEvidence(workspaceId: string, id: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.get(`/dispute/${id}/evidence`);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'listDisputeEvidence');
    }
  }

  async addEvidence(workspaceId: string, id: string, dto: AddEvidenceDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.post(`/dispute/${id}/evidence`, dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'addEvidence');
    }
  }

  async resolveDispute(workspaceId: string, id: string, dto: ResolveDisputeDto) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      const { data } = await client.put(`/dispute/${id}/resolve`, dto);
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'resolveDispute');
    }
  }

  async acceptDisputeCharge(workspaceId: string, id: string) {
    const client = await this.paystack.clientFor(workspaceId);
    try {
      // Paystack accept dispute is a resolve with merchant-accepted resolution
      const { data } = await client.put(`/dispute/${id}/resolve`, {
        resolution: 'merchant-accepted',
      });
      return data;
    } catch (err) {
      this.paystack.handleError(err, 'acceptDisputeCharge');
    }
  }
}
