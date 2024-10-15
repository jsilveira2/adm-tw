import { boolean, string, date, z } from 'zod'

export const userGuildSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    createdAt: date().default(new Date()),
    userId: string().uuid({ message: 'Invalid User ID' }),
    guildId: string().uuid({ message: 'Invalid Guild ID' })
});

export type UserGuild = z.infer<typeof userGuildSchema>;