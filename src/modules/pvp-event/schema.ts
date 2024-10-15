import { boolean, string, number, date, z } from 'zod'

export const pvpEventSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    name: string().min(2, { message: 'Invalid name length' }),
    date: date(),
    guildId: string().uuid({ message: 'Invalid Guild ID' }),
    type: number().default(0),
    ended: boolean().default(false),
    createdAt: date().default(new Date()),
    updatedAt: date().default(new Date()),
});

export type PvPEvent = z.infer<typeof pvpEventSchema>;