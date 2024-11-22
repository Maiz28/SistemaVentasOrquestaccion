import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class IndexController {
  public async index(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany();
      //return res.json({ message: "API Works" });
      const user = {
        cveUsuario: 1,
        nombre: "marisol",
        rol: [1, 2, 3],
      };
      const token = utils.generateJWT(user);
      console.log(token);
      let jwt =
        " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdmVVc3VhcmlvIjoxLCJub21icmUiOiJtYXJpc29sIiwicm9sIjpbMSwyLDNdLCJpYXQiOjE3MjAyMjc1NTcsImV4cCI6MTcyMDIzMTE1N30.geucHl59QuOOdK7ak__UTFQm-MSRcfUUs-RPBD2TSi8";

      let data = utils.getPayload(jwt);
      return res.json({ message: "API Words" });
      console.log(data);
    } catch (error: any) {
      return res.status(500).json({ message: `Error ${error.message}` });
    }
  }

  public insert(req: Request, res: Response) {
    try {
      throw new RangeError("Error inesperdo");
      return res.json({ message: "API Works" });
    } catch (error: any) {
      return res.status(500).json({ message: `Error ${error.message}` });
    }
  }

  public update(req: Request, res: Response) {
    try {
      throw new RangeError("Error inesperdo");
      return res.json({ message: "API Works" });
    } catch (error: any) {
      return res.status(500).json({ message: `Error ${error.message}` });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      throw new RangeError("Error inesperdo");
      return res.json({ message: "API Works" });
    } catch (error: any) {
      return res.status(500).json({ message: `Error ${error.message}` });
    }
  }
}

export const indexController = new IndexController();
