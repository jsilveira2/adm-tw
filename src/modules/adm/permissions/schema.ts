import { boolean, string, date, z, array } from 'zod'
import { rolePermissionsSchema } from '../role-permissions/schema';

export const permissionSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    isActive: boolean().default(true),
    createdAt: date().default(new Date()),
    updatedAt: date().default(new Date()),
    rolePermissions: array(rolePermissionsSchema).optional(),
});

export type Permission = z.infer<typeof permissionSchema>;