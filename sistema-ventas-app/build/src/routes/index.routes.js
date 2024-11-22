"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controllers_1 = require("../controller/index.controllers");
const validator_check_1 = require("../middlewares/validator.check");
const auth_rules_1 = require("../../rules/auth.rules");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    /**
     *
     */
    config() {
        /**
         * @swagger
         * /api:
         *  get:
         *      tags: ["index"]
         *      summary: Defaul Index
         *      description: Ruta por defecto de la API
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.get("/", (0, auth_rules_1.authRules)(), [validator_check_1.validate], index_controllers_1.indexController.index);
        /**
         * @swagger
         * /api:
         *  post:
         *      tags: ["index"]
         *      summary: Defaul Index
         *      description: Ruta por defecto de la API
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.post("/", index_controllers_1.indexController.insert);
        /**
         * @swagger
         * /api:
         *  put:
         *      tags: ["index"]
         *      summary: Defaul Index
         *      description: Ruta por defecto de la API
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.put("/", index_controllers_1.indexController.update);
        /**
         * @swagger
         * /api:
         *  delete:
         *      tags: ["index"]
         *      summary: Defaul Index
         *      description: Ruta por defecto de la API
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.delete("/", index_controllers_1.indexController.delete);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
