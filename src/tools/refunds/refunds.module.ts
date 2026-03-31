import { Module } from '@nestjs/common';
import { RefundsController } from './refunds.controller';
import { RefundsService } from './refunds.service';
import { PaystackModule } from '../../paystack/paystack.module';

@Module({
  imports: [PaystackModule],
  controllers: [RefundsController],
  providers: [RefundsService],
})
export class RefundsModule {}
