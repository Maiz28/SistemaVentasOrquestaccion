import jwt from "jsonwebtoken";
import keys from "../config/keys";
import bcrypt from "bcryptjs";

/**
 * @name Utils
 * @author Marisol Núñez
 * @creation 05/06/2024
 */

class Utils {
  /**
   * @name generateJWT
   * @description Metoddo para generar un token OAUTH
   * @param payload
   * @returns string
   */
  public generateJWT(payload: any): string {
    var token = jwt.sign(payload, keys.secret.jwt, { expiresIn: "1h" });
    return token;
  }
  /**
   * @name getPayload
   * @description Obtener la informacion del JWT
   * @param token
   * @returns objeto
   */

  public getPayload(token: string): any {
    var payload = <any>jwt.verify(token, keys.secret.jwt);
    const { iat, exp, ...data } = payload;
    return data;
  }

  /**
   * @name hashPassword
   * @description Encriptar cadena de texto
   * @param password
   * @returns Promise<string>
   */
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(password, salt);
  }

  /**
   * @name checkPassword
   * @description Verificar la contraseña
   * @param password
   * @param encryptedPassword
   * @returns Promise<boolean>
   */
  public async checkPassword(
    password: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compareSync(password, encryptedPassword);
  }
}

export const utils = new Utils();
