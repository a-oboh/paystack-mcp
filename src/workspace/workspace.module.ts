import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { ApiKeyService } from './api-key.service';
import { WorkspaceController } from './workspace.controller';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, ApiKeyService],
  exports: [WorkspaceService, ApiKeyService],
})
export class WorkspaceModule {}
