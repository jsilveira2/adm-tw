"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes.ts
var routes_exports = {};
__export(routes_exports, {
  routes: () => routes
});
module.exports = __toCommonJS(routes_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  routes
});
