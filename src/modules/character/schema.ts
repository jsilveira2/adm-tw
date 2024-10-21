import { boolean, string, date, z, number } from 'zod'

export const characterSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    name: string().min(2, { message: 'Invalid name length' }),
    rank: number().optional().nullable(),
    defaultDisponibility: number().optional().nullable(),
    ownerName: string().optional().nullable(),
    obs: string().optional().nullable(),
    isActive: boolean().default(true),
    classId: string().uuid({ message: 'Invalid Character Class ID' }),
    guildId: string().uuid({ message: 'Invalid Guild ID' }),
    createdAt: date().default(new Date()).optional().nullable(),
    updateAt: date().default(new Date()).optional().nullable()
});

export type Character = z.infer<typeof characterSchema>;