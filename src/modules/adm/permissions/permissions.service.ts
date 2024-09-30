import { ErrorHelper } from '../../../helpers/error-helper';
import { PermissionsDb } from '@prisma/client';
import { IPermissionsRepositories } from './permissions.repositories';
import { ServiceBase } from '../../base/base.service';

export class PermissionsService extends ServiceBase<PermissionsDb, string> {
    constructor(repository: IPermissionsRepositories) {
        super(repository, 'PermissionsService');
    }

    async findByRoleId(roleId: string): Promise<PermissionsDb[]> {
        const findData = await this.repository.findByRoleId(roleId);

        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByRoleId', 'Permissions not found', 404);
        }

        return findData;
    }

    async deleteByRoleId(roleId: string): Promise<void> {
        await this.repository.deleteByRoleId(roleId);
    }
}