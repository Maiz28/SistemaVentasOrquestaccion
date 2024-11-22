"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class UserController {
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const currentUser = utils_1.utils.getPayload(token);
                const listUsers = yield database_1.default.usuario.findMany({
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
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "No se encontró el usuario." });
            }
        });
    }
    newUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellidos, username, rol, password } = req.body;
                // Cifra la contraseña
                const hashedPassword = yield utils_1.utils.hashPassword(password);
                // Inserta el nuevo usuario en la base de datos
                const newUser = yield database_1.default.usuario.create({
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
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Error interno" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cveusuario, nombre, apellidos, rol } = req.body;
                // Actualiza al usuario
                const updateUser = yield database_1.default.usuario.update({
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
            }
            catch (error) {
                return res.status(500).json({ message: "No se encontró el usuario." });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cveusuario } = req.body;
                if (!cveusuario || isNaN(Number(cveusuario))) {
                    return res.status(400).json({ message: "ID de usuario inválido." });
                }
                // Actualiza al usuario
                const deleteUser = yield database_1.default.usuario.delete({
                    where: { cveusuario: Number.parseInt(cveusuario) },
                });
                return res
                    .status(200)
                    .json({ message: "Usuario eliminado correctamente" });
            }
            catch (error) {
                return res.status(500).json({ message: "No se encontró el usuario." });
            }
        });
    }
}
exports.userController = new UserController();
