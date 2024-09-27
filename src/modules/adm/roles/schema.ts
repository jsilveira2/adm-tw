import { boolean, string, date, z, array } from 'zod'
import { rolePermissionsSchema } from '../role-permissions/schema';

export const roleSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    name: string().min(2, { message: 'invalid name length' }),
    isActive: boolean().default(true),
    createdAt: date().default(new Date()),
    updatedAt: date().default(new Date())
});

export type Role = z.infer<typeof roleSchema>;