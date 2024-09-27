import { PermissionsDb } from '@prisma/client';
import { Permission } from '../../modules/adm/permissions/schema';

export abstract class IPermissionsRepositories {
  abstract findById(id: string): Promise<PermissionsDb | null>;
  abstract findByRoleId(roleId: string): Promise<PermissionsDb[]>;
  abstract save(obj: Permission): Promise<PermissionsDb>;
  abstract update(obj: Permission): Promise<PermissionsDb>;
  abstract delete(id: string): Promise<void>;
  abstract deleteByRoleId(roleId: string): Promise<void>;
}