import { string, date, z } from 'zod';

export const pvpEventPartySchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    name: string().min(2, { message: 'Invalid name length' }),
    obs: string().optional().nullable(),
    pvpEventId: string().uuid({ message: 'Invalid PvP Event ID' }),
    createdAt: date().default(new Date()),
    updatedAt: date().default(new Date())
});

export type PvPEventParty = z.infer<typeof pvpEventPartySchema>;