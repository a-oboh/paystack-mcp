import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller';
import { TransfersService } from './transfers.service';
import { PaystackModule } from '../../paystack/paystack.module';

@Module({
  imports: [PaystackModule],
  controllers: [TransfersController],
  providers: [TransfersService],
})
export class TransfersModule {}
