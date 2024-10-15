import { string, date, number, z } from 'zod'

export const externalPlayersDisponibilitySchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    disponibility: number().int(),
    obs: string().nullable().optional(),
    pvpEventId: string().uuid({ message: 'Invalid PvP Event ID' }),
    externalPlayerId: string().uuid({ message: 'Invalid External Player ID' }),
    createdAt: date().default(new Date()),
    updatedAt: date().default(new Date()),
});

export type ExternalPlayersDisponibility = z.infer<typeof externalPlayersDisponibilitySchema>;