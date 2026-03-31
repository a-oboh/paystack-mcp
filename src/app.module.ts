import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { PaystackModule } from './paystack/paystack.module';
import { ApiKeyGuard } from './auth/api-key.guard';

// Tool modules
import { PaymentsModule } from './tools/payments/payments.module';
import { TransfersModule } from './tools/transfers/transfers.module';
import { CustomersModule } from './tools/customers/customers.module';
import { SubscriptionsModule } from './tools/subscriptions/subscriptions.module';
import { DisputesModule } from './tools/disputes/disputes.module';
import { RefundsModule } from './tools/refunds/refunds.module';
import { VerificationModule } from './tools/verification/verification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    WorkspaceModule,
    PaystackModule,
    // Tool modules
    PaymentsModule,
    TransfersModule,
    CustomersModule,
    SubscriptionsModule,
    DisputesModule,
    RefundsModule,
    VerificationModule,
  ],
  providers: [
    // Apply ApiKeyGuard globally to every route
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
