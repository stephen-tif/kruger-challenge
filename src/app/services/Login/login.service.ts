import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ==> Interfaces
import { Usuario } from '../../intefraces/usuario';
import { Empleado } from 'src/app/intefraces/empleado';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Función para verificar si existe usuario ingresado
   * @param user <string> Usuario
   * @param password <string> Contraseña
   * @returns
   */
  loginWithUserAndPass(user: string, password: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.get('assets/fakeApi.json').subscribe(
        (res: any) => {
          const users: Array<Usuario> = res?.users || [];

          const filter = users.filter(
            (el) => el?.user === user && el?.password === password
          );

          if (filter.length) {
            resolve({
              ok: filter.length > 0,
              msg: filter.length > 0 ? 'Éxito' : 'Error',
              type: 'Admin',
            });
          } else {
            //* ==> Buscar usuario en empleados <== *//

            // ==> Obtener Data
            const empleados: any = localStorage.getItem('empleados') || '';
            const dataParse: Array<Empleado> = empleados
              ? JSON.parse(empleados)
              : [];

            const filterEmpleados = dataParse.filter(
              ({ userInfo }) =>
                userInfo?.user === user && userInfo?.password === password
            );

            resolve({
              ok: filterEmpleados.length > 0,
              msg: filterEmpleados.length > 0 ? 'Éxito' : 'Error',
              type: 'Empleado',
            });
          }
        },
        (er) => {
          console.error('|| ==> Error loginWithUserAndPass <== ||', er);
          reject(er);
        }
      );
    });
  }
}
