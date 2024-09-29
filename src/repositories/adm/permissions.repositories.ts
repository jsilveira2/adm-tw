import { PermissionsDb } from '@prisma/client';
import { IBaseRepositories } from '../base/base.repositories';

export abstract class IPermissionsRepositories extends IBaseRepositories<PermissionsDb, string> {
	abstract findByRoleId(roleId: string): Promise<PermissionsDb[]>;
	abstract deleteByRoleId(roleId: string): Promise<void>;
}