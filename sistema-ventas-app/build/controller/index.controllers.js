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
exports.indexController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield database_1.default.usuario.findMany();
                //return res.json({ message: "API Works" });
                const user = {
                    cveUsuario: 1,
                    nombre: "marisol",
                    rol: [1, 2, 3],
                };
                const token = utils_1.utils.generateJWT(user);
                console.log(token);
                let jwt = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdmVVc3VhcmlvIjoxLCJub21icmUiOiJtYXJpc29sIiwicm9sIjpbMSwyLDNdLCJpYXQiOjE3MjAyMjc1NTcsImV4cCI6MTcyMDIzMTE1N30.geucHl59QuOOdK7ak__UTFQm-MSRcfUUs-RPBD2TSi8";
                let data = utils_1.utils.getPayload(jwt);
                return res.json({ message: "API Words" });
                console.log(data);
            }
            catch (error) {
                return res.status(500).json({ message: `Error ${error.message}` });
            }
        });
    }
    insert(req, res) {
        try {
            throw new RangeError("Error inesperdo");
            return res.json({ message: "API Works" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error ${error.message}` });
        }
    }
    update(req, res) {
        try {
            throw new RangeError("Error inesperdo");
            return res.json({ message: "API Works" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error ${error.message}` });
        }
    }
    delete(req, res) {
        try {
            throw new RangeError("Error inesperdo");
            return res.json({ message: "API Works" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error ${error.message}` });
        }
    }
}
exports.indexController = new IndexController();
