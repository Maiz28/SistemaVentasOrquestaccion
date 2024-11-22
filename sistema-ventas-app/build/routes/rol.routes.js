"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_controllers_1 = require("../controller/roles.controllers");
class RolRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/getRol", roles_controllers_1.rolController.getRoles);
    }
}
const rolRoutes = new RolRoutes();
exports.default = rolRoutes.router;
