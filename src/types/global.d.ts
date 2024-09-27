import { FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyReply {
    setCookie(name: string, value: string, options?: CookieSerializeOptions): FastifyReply;
  }

  interface FastifyRequest {
    cookies: { [cookieName: string]: string };
  }
}
