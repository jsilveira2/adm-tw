import { RolesDb } from '@prisma/client';
import { Role } from '../../modules/adm/roles/schema';

export abstract class IRolesRepositories {
  abstract findById(id: string): Promise<RolesDb | null>;
  abstract findByArrayIds(ids: string[]): Promise<RolesDb[]>;
  abstract save(obj: Role): Promise<RolesDb>;
  abstract update(obj: Role): Promise<RolesDb>;
  abstract delete(id: string): Promise<void>;
}