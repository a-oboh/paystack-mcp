import { Injectable, BadGatewayException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WorkspaceService } from '../workspace/workspace.service';
import axios, { type AxiosInstance, type AxiosError } from 'axios';

@Injectable()
export class PaystackService {
  private readonly logger = new Logger(PaystackService.name);
  private readonly baseURL: string;

  constructor(
    private readonly config: ConfigService,
    private readonly workspaceService: WorkspaceService,
  ) {
    this.baseURL = this.config.get('PAYSTACK_BASE_URL', 'https://api.paystack.co');
  }

  /**
   * Returns an axios instance pre-configured with the workspace's
   * Paystack secret key. Call this at the start of every tool handler.
   */
  async clientFor(workspaceId: string): Promise<AxiosInstance> {
    const secretKey = await this.workspaceService.getDecryptedPaystackKey(workspaceId);

    return axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30_000,
    });
  }

  /**
   * Normalises Paystack API errors into NestJS-friendly exceptions.
   * Call this in catch blocks within tool handlers.
   */
  handleError(error: unknown, context: string): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string; status?: boolean }>;
      const status = axiosError.response?.status;
      const message = axiosError.response?.data?.message ?? axiosError.message;

      this.logger.error(`Paystack error [${context}] ${status}: ${message}`);
      throw new BadGatewayException(`Paystack error: ${message}`);
    }

    this.logger.error(`Unexpected error [${context}]:`, error);
    throw new BadGatewayException('Unexpected error communicating with Paystack');
  }
}
