import { RolesService } from './roles.service';
import { roleSchema } from './schema';
import { ControllerBase } from '../../base/base.controller';

export class RolesController extends ControllerBase<typeof roleSchema.shape> {
    constructor(public readonly service: RolesService) {
        super(service, roleSchema);
    }
}