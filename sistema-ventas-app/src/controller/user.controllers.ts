import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class UserController {
  public async listUsers(req: Request, res: Response) {
    try {
      const token = <string>req.headers["auth"];
      const currentUser = utils.getPayload(token);
      const listUsers = await prisma.usuario.findMany({
        select: {
          cveusuario: true,
          nombre: true,
          apellidos: true,
          rol: true,
          username: true,
          fecharegistro: true,
          cverol: true,
        },
        where: { cveusuario: { not: currentUser.cveusuario } },
        orderBy: { cveusuario: "asc" },
      });

      return res.status(200).json(listUsers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "No se encontró el usuario." });
    }
  }

  public async newUser(req: Request, res: Response) {
    try {
      const { nombre, apellidos, username, rol, password } = req.body;
      // Cifra la contraseña
      const hashedPassword = await utils.hashPassword(password);

      // Inserta el nuevo usuario en la base de datos
      const newUser = await prisma.usuario.create({
        data: {
          nombre: nombre,
          apellidos: apellidos,
          username: username,
          cverol: Number.parseInt(rol),
          password: hashedPassword,
        },
      });

      console.log(newUser);

      if (!newUser) {
        return res
          .status(400)
          .json({ message: "Ocurrió un error al guardar el usuario" });
      }

      return res
        .status(200)
        .json({ message: "Usuario guardado correctamente" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno" });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const { cveusuario, nombre, apellidos, rol } = req.body;

      // Actualiza al usuario
      const updateUser = await prisma.usuario.update({
        where: { cveusuario: Number.parseInt(cveusuario) },
        data: {
          nombre: nombre,
          apellidos: apellidos,
          cverol: Number.parseInt(rol),
        },
      });

      return res.status(200).json({
        message: "Usuario actualizado correctamente",
        usuario: nombre,
      });
    } catch (error) {
      return res.status(500).json({ message: "No se encontró el usuario." });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { cveusuario } = req.body;

      if (!cveusuario || isNaN(Number(cveusuario))) {
        return res.status(400).json({ message: "ID de usuario inválido." });
      }

      // Actualiza al usuario
      const deleteUser = await prisma.usuario.delete({
        where: { cveusuario: Number.parseInt(cveusuario) },
      });

      return res
        .status(200)
        .json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      return res.status(500).json({ message: "No se encontró el usuario." });
    }
  }
}

export const userController = new UserController();
