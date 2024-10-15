import { CharacterClassesService } from './character-classes.service';
import { characterClassesSchema } from './schema';
import { ControllerBase } from '../base/base.controller';

export class CharacterClassesController extends ControllerBase<typeof characterClassesSchema.shape> {
    constructor(public readonly service: CharacterClassesService) {
        super(service, characterClassesSchema);
    }
}
