import { Request, Response } from "express";
import prisma from "../database/database";

class RolControllers {
  public async getRoles(req: Request, res: Response) {
    try {
      const rolesUso = await prisma.rol.findMany({
        where: { activo: true },
        orderBy: { descripcion: "asc" },
      });
      return res.status(200).json(rolesUso);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}

export const rolController = new RolControllers();
