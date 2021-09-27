import { Injectable } from '@angular/core';

// ==> Interfaces
import { Empleado } from '../../intefraces/empleado';

// ==> Services
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private global: GlobalService) {}

  async craeteUser(data: Empleado): Promise<any> {
    try {
      // ==> Generar Contraseña
      const id = (data?.id).toString().substring(0, 3);
      const num = this.global.getRndInteger();

      const pass = `new${id}Record${num}`;

      // ==> Obtener Data
      const dataSave = (await localStorage.getItem('empleados')) || '';
      const dataParse: Array<Empleado> = dataSave ? JSON.parse(dataSave) : [];

      const record = dataParse && dataParse.filter((el) => el?.id === data?.id);
      const newData = record[0] || {};
      const newInfo = {
        ...newData,
        userInfo: {
          user: data?.correo,
          password: pass.toString(),
        },
      };

      const filter = dataParse && dataParse.filter((el) => el?.id !== data?.id);

      const newDataSave = [...filter, newInfo];
      await localStorage.removeItem('empleados'); // ==> Eliminar
      await localStorage.setItem('empleados', JSON.stringify(newDataSave)); // ==> Reemplazar

      return Promise.resolve({ ok: true });
    } catch (er) {
      console.error('|| ==> Error craeteUser <== ||', er);
    }
  }

  async get(): Promise<any> {
    try {
      const empleados: any = localStorage.getItem('empleados') || '';
      const dataParse = empleados ? JSON.parse(empleados) : [];

      return Promise.resolve({ ok: true, data: dataParse });
    } catch (er) {
      console.error('|| ==> Error Get Data Employees <== ||', er);
    }
  }

  async post(data: Empleado): Promise<any> {
    try {
      // ==> Obtener Data
      const dataSave = (await localStorage.getItem('empleados')) || '';
      const dataParse = dataSave ? JSON.parse(dataSave) : [];

      const newData = [...dataParse, data];
      await localStorage.removeItem('empleados'); // ==> Eliminar
      await localStorage.setItem('empleados', JSON.stringify(newData)); // ==> Reemplazar

      return Promise.resolve({ ok: true });
    } catch (er) {
      console.error('|| ==> Error saving employee data <== ||', er);
    }
  }

  async put(data: Empleado): Promise<any> {
    try {
      // ==> Obtener Data
      const dataSave = (await localStorage.getItem('empleados')) || '';
      const dataParse: Array<Empleado> = dataSave ? JSON.parse(dataSave) : [];

      const filter = dataParse && dataParse.filter((el) => el?.id !== data?.id);

      const newData = [...filter, data];
      await localStorage.removeItem('empleados'); // ==> Eliminar
      await localStorage.setItem('empleados', JSON.stringify(newData)); // ==> Reemplazar

      return Promise.resolve({ ok: true });
    } catch (er) {
      console.error('|| ==> Error Modify employee data <== ||', er);
    }
  }

  async delete(data: Empleado): Promise<any> {
    try {
      // ==> Obtener Data
      const dataSave = (await localStorage.getItem('empleados')) || '';
      const dataParse: Array<Empleado> = dataSave ? JSON.parse(dataSave) : [];

      const filter = dataParse && dataParse.filter((el) => el?.id !== data?.id);

      await localStorage.removeItem('empleados'); // ==> Eliminar
      await localStorage.setItem('empleados', JSON.stringify(filter)); // ==> Reemplazar

      return Promise.resolve({ ok: true });
    } catch (er) {
      console.error('|| ==> Error Delete employee data <== ||', er);
    }
  }
}
