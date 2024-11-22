import { Router } from "express";
import { userController } from "../controller/user.controllers";
import {
  deleteUserRules,
  newUserRules,
  updateUserRules,
} from "../rules/user.rules";
import { validate } from "../middlewares/validator.check";

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  /**
   * @swagger
   * definitions:
   *     User:
   *       type: object
   *       properties:
   *         cveusuario:
   *           type: integer
   *           description: ID del usuario
   *         nombre:
   *           type: string
   *           description: Nombre del usuario
   *         apellidos:
   *           type: string
   *           description: Apellidos del usuario
   *         email:
   *           type: string
   *           description: Correo electrónico del usuario
   *         rol:
   *           type: array
   *           description: Rol del usuario
   *         username:
   *           type: string
   *           description: Nombre de usuario
   *     NewUser:
   *       type: object
   *       required:
   *         - nombre
   *         - apellidos
   *         - username
   *         - email
   *         - rol
   *         - password
   *       properties:
   *         nombre:
   *           type: string
   *         apellidos:
   *           type: string
   *         username:
   *           type: string
   *         email:
   *           type: string
   *         rol:
   *           type: array
   *         password:
   *           type: string
   *     UpdateUser:
   *       type: object
   *       required:
   *         - cveusuario
   *       properties:
   *         cveusuario:
   *           type: integer
   *         nombre:
   *           type: string
   *         apellidos:
   *           type: string
   *         email:
   *           type: string
   *         rol:
   *           type: array
   *         username:
   *           type: string
   *     DeleteUser:
   *       type: object
   *       required:
   *         - cveusuario
   *       properties:
   *         cveusuario:
   *           type: integer
   */

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: API para gestionar usuarios
   */
  config() {
    /**
     * @swagger
     * /api/user/getUsers:
     *   get:
     *     summary: Obtiene una lista de usuarios
     *     tags: [Users]
     *     produce:
     *        - application/json
     *     responses:
     *       200:
     *         description: Lista de usuarios
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/definitions/User'
     *       500:
     *         description: Error interno del servidor
     */
    this.router.get("/getUsers", userController.listUsers);

    /**
     * @swagger
     * /api/user/newUser:
     *   post:
     *     summary: Crea un nuevo usuario
     *     tags: [Users]
     *     produce:
     *        - application/json
     *     parameters:
     *        -  in: body
     *           name: Nuevo usuario
     *           description: Datos del usuario.
     *           schema:
     *             $ref: '#/definitions/NewUser'
     *           required: true
     *     responses:
     *       200:
     *         description: Usuario creado exitosamente
     *       400:
     *         description: Error al guardar el usuario
     *       500:
     *         description: Error interno del servidor
     */
    this.router.post(
      "/newUser",
      newUserRules(),
      [validate],
      userController.newUser
    );

    /**
     * @swagger
     * /api/user/updateUser:
     *   put:
     *     summary: Crea un nuevo usuario
     *     tags: [Users]
     *     produce:
     *        - application/json
     *     parameters:
     *        -  in: body
     *           name: Nuevo usuario
     *           description: Datos del usuario.
     *           schema:
     *             $ref: '#/definitions/UpdateUser'
     *           required: true
     *     responses:
     *       200:
     *         description: Usuario creado exitosamente
     *       400:
     *         description: Error al guardar el usuario
     *       500:
     *         description: Error interno del servidor
     */
    this.router.put(
      "/updateUser",
      updateUserRules(),
      [validate],
      userController.updateUser
    );

    /**
     * @swagger
     * /api/user/deleteUser:
     *   post:
     *     summary: Crea un nuevo usuario
     *     tags: [Users]
     *     produce:
     *        - application/json
     *     parameters:
     *        -  in: body
     *           name: Nuevo usuario
     *           description: Datos del usuario.
     *           schema:
     *             $ref: '#/definitions/DeleteUser'
     *           required: true
     *     responses:
     *       200:
     *         description: Usuario creado exitosamente
     *       400:
     *         description: Error al guardar el usuario
     *       500:
     *         description: Error interno del servidor
     */
    this.router.post(
      "/deleteUser",
      deleteUserRules(),
      [validate],
      userController.deleteUser
    );
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
