import { string, z } from 'zod'

export const idSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
});

export const arrayOfIdsSchema = z.array(z.string().uuid({ message: 'Invalid ID format' }));