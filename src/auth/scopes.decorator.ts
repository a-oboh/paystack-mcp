import { SetMetadata } from '@nestjs/common';

export const SCOPES_KEY = 'scopes';

export const RequireScopes = (...scopes: string[]) => SetMetadata(SCOPES_KEY, scopes);

// All valid scopes as constants — import these everywhere instead of raw strings
export const Scopes = {
  PAYMENTS_READ: 'payments:read',
  PAYMENTS_WRITE: 'payments:write',
  TRANSFERS_READ: 'transfers:read',
  TRANSFERS_WRITE: 'transfers:write',
  CUSTOMERS_READ: 'customers:read',
  CUSTOMERS_WRITE: 'customers:write',
  SUBSCRIPTIONS_READ: 'subscriptions:read',
  SUBSCRIPTIONS_WRITE: 'subscriptions:write',
  DISPUTES_READ: 'disputes:read',
  DISPUTES_WRITE: 'disputes:write',
  REFUNDS_READ: 'refunds:read',
  REFUNDS_WRITE: 'refunds:write',
  VERIFICATION_READ: 'verification:read',
} as const;

export type Scope = (typeof Scopes)[keyof typeof Scopes];
