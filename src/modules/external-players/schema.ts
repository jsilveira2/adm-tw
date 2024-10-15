import { boolean, string, date, z } from 'zod'

export const externalPlayersSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    name: string().min(2, { message: 'Invalid name length' }),
    obs: string().nullable().optional(),
    guildId: string().uuid({ message: 'Invalid Guild ID' }),
    isActive: boolean().default(true),
    createdAt: date().default(new Date()),
    updatedAt: date().default(new Date()),
});

export type ExternalPlayers = z.infer<typeof externalPlayersSchema>;