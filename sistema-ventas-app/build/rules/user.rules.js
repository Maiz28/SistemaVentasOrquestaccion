"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserRules = exports.updateUserRules = exports.newUserRules = void 0;
const express_validator_1 = require("express-validator");
const newUserRules = () => {
    return [
        (0, express_validator_1.body)("nombre")
            .exists()
            .withMessage("Campo Requerido")
            .trim()
            .not()
            .isEmpty()
            .withMessage("El nombre no debe estar vacío.")
            .isLength({ min: 3, max: 150 })
            .withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidos")
            .exists()
            .withMessage("Campo Requerido")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Los apellidos no deben estar vacíos.")
            .isLength({ min: 3, max: 150 })
            .withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("username")
            .exists()
            .withMessage("Campo Requerido")
            .trim()
            .not()
            .isEmpty()
            .withMessage("El username no debe estar vacío.")
            .isLength({ min: 3, max: 150 })
            .withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("rol")
            .exists()
            .withMessage("Campo Requerido")
            .trim()
            .not()
            .isEmpty()
            .withMessage("El rol no debe estar vacío."),
        (0, express_validator_1.body)("password")
            .exists()
            .withMessage("Campo Requerido")
            .trim()
            .not()
            .isEmpty()
            .withMessage("La contraseña no debe estar vacía.")
            .isLength({ min: 8, max: 150 })
            .withMessage("Rango Incorrecto"),
    ];
};
exports.newUserRules = newUserRules;
const updateUserRules = () => {
    return [
        (0, express_validator_1.body)("cveusuario")
            .exists()
            .withMessage("Campo Requerido")
            .trim()
            .not()
            .isEmpty()
            .withMessage("La cveusuario no debe estar vacía."),
        (0, express_validator_1.body)("nombre")
            .exists()
            .withMessage("Campo Requerido")
            .trim()
            .not()
            .isEmpty()
            .withMessage("El nombre no debe estar vacío."),
        (0, express_validator_1.body)("apellidos")
            .exists()
            .withMessage("Campo Requerido")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Los apellidos no deben estar vacíos."),
        (0, express_validator_1.body)("rol")
            .exists()
            .withMessage("Campo Requerido")
            .trim()
            .not()
            .isEmpty()
            .withMessage("El rol no debe estar vacío."),
    ];
};
exports.updateUserRules = updateUserRules;
const deleteUserRules = () => {
    return [
        (0, express_validator_1.body)("cveusuario")
            .exists()
            .withMessage("Campo Requerido")
            .trim()
            .not()
            .isEmpty()
            .withMessage("La cveusuario no debe estar vacía."),
    ];
};
exports.deleteUserRules = deleteUserRules;
