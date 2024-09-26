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

// src/controllers/users.controller.ts
var users_controller_exports = {};
__export(users_controller_exports, {
  UsersController: () => UsersController
});
module.exports = __toCommonJS(users_controller_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsersController
});
