import { Rol } from './rol.interface';

export interface Usuario {
  cveUsuario?: number;
  nombre: String;
  apellido: String;
  username: String;
  password: String;
  fechaRegistro: String;
  rol: Rol;
  cveRol?: String;
}
