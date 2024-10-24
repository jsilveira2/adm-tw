import { boolean, string, date, z, array } from 'zod'

export const roleSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    name: string().min(2, { message: 'invalid name length' }),
    codeName: string().min(2, { message: 'Invalid codeName length' }),
    isActive: boolean().default(true).optional(),
    createdAt: date().default(new Date()).optional(),
    updatedAt: date().default(new Date()).optional()
});

export type Role = z.infer<typeof roleSchema>;