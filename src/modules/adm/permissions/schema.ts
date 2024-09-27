import { boolean, string, date, z } from 'zod'

export const permissionSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    name: string().min(2, { message: 'Invalid name length' }),
    isActive: boolean().default(true),
    createdAt: date().default(new Date()),
    updatedAt: date().default(new Date()),
    roleId: string().uuid({ message: 'Invalid Role ID' })
});

export type Permission = z.infer<typeof permissionSchema>;