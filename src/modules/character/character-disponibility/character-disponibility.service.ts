import { ErrorHelper } from '../../../helpers/error-helper';
import { CharacterEventDisponibilityDb } from '@prisma/client';
import { ICharacterDisponibility } from './character-disponibility.repositories';
import { ServiceBase } from '../../base/base.service';

export class CharacterDisponibilityService extends ServiceBase<CharacterEventDisponibilityDb, string> {
    constructor(public readonly repository: ICharacterDisponibility) {
        super(repository, 'CharacterDisponibilityService');
    }

    async findByPvPEventId(pvpEventId: string): Promise<CharacterEventDisponibilityDb[]> {
        const findData = await this.repository.findByPvPEventId(pvpEventId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByPvPEventId', 'Character Disponibility not found', 404);
        }

        return findData;
    }

    async findByPvPEventIdAndDisponibilityYes(pvpEventId: string): Promise<CharacterEventDisponibilityDb[]> {
        const findData = await this.repository.findByPvPEventIdAndDisponibilityYes(pvpEventId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByPvPEventIdAndDisponibilityYes', 'Character Disponibility not found', 404);
        }

        return findData;
    }

    async deleteByPvPEventId(pvpEventId: string): Promise<void> {
        await this.repository.deleteByPvPEventId(pvpEventId);
    }
}