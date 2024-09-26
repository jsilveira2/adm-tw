"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/http/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/services/system-access/users.service.ts
var UsersService = class {
  async execute() {
    console.log("rota foi chamada");
    return { ok: true };
  }
  async get() {
  }
};

// src/controllers/users.controller.ts
var UsersController = class {
  constructor(userService) {
    this.userService = userService;
    this._userService = this.userService;
  }
  _userService = new UsersService();
  async handle(request, reply) {
    const user = await this._userService.execute();
    reply.send(user);
  }
  async get() {
    return await this._userService.get();
  }
};

// src/routes/users.routes.ts
async function usersRoutes(fastify, options) {
  const usersService = new UsersService();
  const usersController = new UsersController(usersService);
  fastify.get("/users", usersController.get.bind(usersController));
}

// src/routes.ts
async function routes(fastify) {
  fastify.register(usersRoutes);
}

// src/http/server.ts
var app = (0, import_fastify.default)({ logger: true });
var start = async () => {
  await app.register(import_cors.default);
  await app.register(routes);
  try {
    await app.listen({ port: 3333 });
  } catch (err) {
    process.exit(1);
  }
};
start();
