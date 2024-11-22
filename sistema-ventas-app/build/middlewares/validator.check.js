"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    console.log("validator.check");
    // se obtiene los errores a partir del resquest original de la peticion
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
    if (errors.isEmpty())
        return next();
    return res.status(400).json(errors.array());
};
exports.validate = validate;
