import { boolean, string, date, z, number } from 'zod'

export const userSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }),
    email: z.string().email({ message: 'Email inválido' }),
    name: string().min(2, { message: 'invalid name length' }),
    password: string().min(6, { message: 'invalid password length' }),
    isActive: boolean(),
    createdAt: date(),
    updatedAt: date(),
    lastLogin: date(),
    loginAttempts: number(),
    isLocked: boolean()
});

export type User = z.infer<typeof userSchema>;