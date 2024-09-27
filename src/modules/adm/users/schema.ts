import { boolean, string, date, z, number } from 'zod';

export const userSchema = z.object({
    id: string().uuid({ message: 'Invalid ID' }).optional(),
    email: z.string().email({ message: 'Email inválido' }),
    name: string().min(2, { message: 'invalid name length' }),
    password: string().min(6, { message: 'invalid password length' }),
    isActive: boolean().default(true),
    createdAt: date().default(new Date()),
    updatedAt: date().default(new Date()),
    lastLogin: date().nullable().optional(),
    loginAttempts: number().default(0),
    isLocked: boolean().default(false),
    token: string().optional()
});

export type User = z.infer<typeof userSchema>;

export const emailSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    password: string().min(6, { message: 'invalid password length' }),
});

export type Login = z.infer<typeof loginSchema>;