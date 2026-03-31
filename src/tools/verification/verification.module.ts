import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { PaystackModule } from '../../paystack/paystack.module';

@Module({
  imports: [PaystackModule],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
