import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  console.log("validator.check");
  // se obtiene los errores a partir del resquest original de la peticion
  const errors = validationResult(req);
  console.log(errors);

  if (errors.isEmpty()) return next();

  return res.status(400).json(errors.array());
};
