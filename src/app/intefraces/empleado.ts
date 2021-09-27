import { Usuario } from './usuario';

export interface Empleado {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  userInfo?: Usuario;
}
