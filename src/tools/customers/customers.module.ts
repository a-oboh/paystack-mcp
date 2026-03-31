import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { PaystackModule } from '../../paystack/paystack.module';

@Module({
  imports: [PaystackModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
