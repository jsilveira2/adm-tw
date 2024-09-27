import { string, date, z } from 'zod';

export const userRolesSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    createdAt: date().default(new Date()),
    userId: string().uuid({ message: 'Invalid User ID' }),
    roleId: string().uuid({ message: 'Invalid Role ID' })
});

export type UserRoles = z.infer<typeof userRolesSchema>;