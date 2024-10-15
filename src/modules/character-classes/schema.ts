import { boolean, string, date, z } from 'zod'

export const characterClassesSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    name: string().min(2, { message: 'Invalid name length' }),
    shortName: string().min(2, { message: 'Invalid short shortName length' }).max(6, { message: 'Invalid shortName length' }),
    isActive: boolean().default(true),
    createdAt: date().default(new Date())
});

export type CharacterClasses = z.infer<typeof characterClassesSchema>;