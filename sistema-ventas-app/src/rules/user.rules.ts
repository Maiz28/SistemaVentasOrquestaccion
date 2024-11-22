import { body } from "express-validator";

export const newUserRules = () => {
  return [
    body("nombre")
      .exists()
      .withMessage("Campo Requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("El nombre no debe estar vacío.")
      .isLength({ min: 3, max: 150 })
      .withMessage("Rango Incorrecto"),
    body("apellidos")
      .exists()
      .withMessage("Campo Requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Los apellidos no deben estar vacíos.")
      .isLength({ min: 3, max: 150 })
      .withMessage("Rango Incorrecto"),
    body("username")
      .exists()
      .withMessage("Campo Requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("El username no debe estar vacío.")
      .isLength({ min: 3, max: 150 })
      .withMessage("Rango Incorrecto"),
    body("rol")
      .exists()
      .withMessage("Campo Requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("El rol no debe estar vacío."),
    body("password")
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

export const updateUserRules = () => {
  return [
    body("cveusuario")
      .exists()
      .withMessage("Campo Requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("La cveusuario no debe estar vacía."),
    body("nombre")
      .exists()
      .withMessage("Campo Requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("El nombre no debe estar vacío."),
    body("apellidos")
      .exists()
      .withMessage("Campo Requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Los apellidos no deben estar vacíos."),
    body("rol")
      .exists()
      .withMessage("Campo Requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("El rol no debe estar vacío."),
  ];
};

export const deleteUserRules = () => {
  return [
    body("cveusuario")
      .exists()
      .withMessage("Campo Requerido")
      .trim()
      .not()
      .isEmpty()
      .withMessage("La cveusuario no debe estar vacía."),
  ];
};
