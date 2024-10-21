import { ExternalPlayersDisponibilityDb } from '@prisma/client';
import { IBaseRepositories } from '../../base/base.repositories';

export abstract class IExternalPlayersDisponibilityRepositories extends IBaseRepositories<ExternalPlayersDisponibilityDb, string> {
    abstract findByPvPEventId(pvpEventId: string): Promise<ExternalPlayersDisponibilityDb[]>;
    abstract findByPvPEventIdAndDisponibility(pvpEventId: string, disponibility: number): Promise<ExternalPlayersDisponibilityDb[]>;
    abstract findByPvPEventIdAndDisponibilityYes(pvpEventId: string): Promise<ExternalPlayersDisponibilityDb[]>;
    abstract deleteByPvPEventId(pvpEventId: string): Promise<void>;
}