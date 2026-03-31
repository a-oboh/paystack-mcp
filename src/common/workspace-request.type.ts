import type { Request } from 'express';
import type { Workspace } from '@prisma/client';

export interface WorkspaceRequest extends Request {
  workspace: Pick<Workspace, 'id' | 'name'>;
}
