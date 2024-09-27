import { boolean, string, date, z } from 'zod'

export const guildSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    name: string().min(2, { message: 'Invalid name length' }),
    isActive: boolean().default(true),
    createdAt: date().default(new Date()),
    updatedAt: date().default(new Date())
});

export type Guild = z.infer<typeof guildSchema>;