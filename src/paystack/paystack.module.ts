import { Module } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  imports: [WorkspaceModule],
  providers: [PaystackService],
  exports: [PaystackService],
})
export class PaystackModule {}
