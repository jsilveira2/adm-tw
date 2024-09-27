import { FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
	interface FastifyReply {
		setCookie(name: string, value: string, options?: CookieSerializeOptions): FastifyReply;
	}

	interface FastifyRequest {
		cookies: { [cookieName: string]: string };
	}

	interface FastifyInstance {
		jwt: {
			sign: (payload: any, options?: any) => string;
			verify: (token: string, options?: any) => any;
		};
	}
}
