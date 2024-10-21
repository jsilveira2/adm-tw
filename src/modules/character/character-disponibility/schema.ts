import { string, date, z, number } from 'zod';

export const characterDisponibilitySchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    disponibility: number().optional().nullable(),
    obs: string().optional().nullable(),
    pvpEventId: string().uuid({ message: 'Invalid PvP Event ID' }),
    characterId: string().uuid({ message: 'Invalid Character ID' }),
    externalPlayerId: string().uuid({ message: 'Invalid External Player ID' }).optional().nullable(),
    createdAt: date().default(new Date()),
    updateAt: date().default(new Date()).optional().nullable(),
});

export type CharacterDisponibility = z.infer<typeof characterDisponibilitySchema>;