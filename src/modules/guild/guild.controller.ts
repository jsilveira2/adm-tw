import { GuildService } from './guild.service';
import { guildSchema } from './schema';
import { ControllerBase } from '../base/base.controller';

export class GuildController extends ControllerBase<typeof guildSchema.shape> {
    constructor(public readonly service: GuildService) {
        super(service, guildSchema);
    }
}
