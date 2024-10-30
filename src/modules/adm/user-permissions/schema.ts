import { string, date, z } from 'zod';

export const userPermissionsSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    createdAt: date().default(new Date()).optional(),
    userId: string().uuid({ message: 'Invalid User ID' }),
    permissionId: string().uuid({ message: 'Invalid Permission ID' })
});

export type UserPermissions = z.infer<typeof userPermissionsSchema>;