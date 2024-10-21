import { ErrorHelper } from '../../helpers/error-helper';
import { CharactersDb } from '@prisma/client';
import { ICharacter } from './character.repositories';
import { ServiceBase } from '../base/base.service';

export class CharacterService extends ServiceBase<CharactersDb, string> {
    constructor(repository: ICharacter) {
        super(repository, 'CharacterService');
    }

    async findByGuildId(guildId: string): Promise<CharactersDb[]> {
        const findData = await this.repository.findByGuildId(guildId);
        
        if (!findData || findData.length === 0) {
            throw new ErrorHelper(this.className, 'findByGuildId', 'Character not found', 404);
        }

        return findData;
    }

    async deleteByGuildId(guildId: string): Promise<void> {
        await this.repository.deleteByGuildId(guildId);
    }
}