import { Module } from '@nestjs/common';
import { DisputesController } from './disputes.controller';
import { DisputesService } from './disputes.service';
import { PaystackModule } from '../../paystack/paystack.module';

@Module({
  imports: [PaystackModule],
  controllers: [DisputesController],
  providers: [DisputesService],
})
export class DisputesModule {}
