import { describe, it, expect, vi, afterEach } from 'vitest';
import { UsersController } from '../../../../src/modules/adm/users/users.controller';
import { UsersService } from '../../../../src/modules/adm/users/users.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ErrorHelper } from '../../../../src/helpers/error-helper';
import { UsersDb } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const mockService = {
    login: vi.fn(),
    findByEmail: vi.fn(),
};

const mockRequest = (body = {}, params = {}) => ({
    body,
    params,
}) as FastifyRequest;

const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
};

const mockUser: UsersDb = {
    id: uuidv4(),
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    loginAttempts: 0,
    isLocked: false,
    lastLogin: null
};

describe('UsersController', () => {
    const usersController = new UsersController(mockService as unknown as UsersService);

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should log in a user successfully', async () => {
        const request = mockRequest({ email: 'test@example.com', password: 'plainPassword' });
        mockService.login.mockResolvedValue(mockUser);

        const response = await usersController.login(request, mockReply as unknown as FastifyReply);

        expect(response).toEqual(mockUser);
        expect(mockService.login).toHaveBeenCalledWith('test@example.com', 'plainPassword');
    });

    it('should throw an error when login credentials are invalid', async () => {
        const request = mockRequest({ email: 'test@example.com', password: 'wrongPassword' });
        mockService.login.mockRejectedValue(new ErrorHelper('UsersService', 'login', 'Invalid credentials', 404));

        await expect(usersController.login(request, mockReply as unknown as FastifyReply))
            .rejects
            .toThrowError(new ErrorHelper('UsersService', 'login', 'Invalid credentials', 404));
    });

    it('should get user by email', async () => {
        const userMock = {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
        };
        const request = mockRequest({}, { email: 'test@example.com' });
        mockService.findByEmail.mockResolvedValue(userMock);

        await usersController.getByEmail(request, mockReply as unknown as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(200);
        expect(mockReply.send).toHaveBeenCalledWith(userMock);
        expect(mockService.findByEmail).toHaveBeenCalledWith('test@example.com');
    });
});
