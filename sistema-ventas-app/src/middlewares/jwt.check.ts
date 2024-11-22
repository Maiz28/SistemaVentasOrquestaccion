import { NextFunction, Request, Response } from "express";
import { Jwt } from "jsonwebtoken";
import { utils } from "../utils/utils";

export const jwtCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.headers["auth"];

    //Todo: obtener la informacion del token
    let payload = utils.getPayload(token);

    //TODO: refreshToken

    const newToken = utils.generateJWT(payload);
    res.setHeader("auth", newToken);

    next();
  } catch (error) {
    return res.status(401).send("Not Authorized");
  }
};
