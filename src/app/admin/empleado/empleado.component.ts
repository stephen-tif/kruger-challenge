import { Component, OnInit } from '@angular/core';

// ==> NG Zorro
import { NzButtonSize } from 'ng-zorro-antd/button';

// Forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ==> Interface
import { Empleado } from '../../intefraces/empleado';
import { GlobalService } from '../../services/global/global.service';

// ==> Services
import { EmpleadoService } from '../../services/Empleado/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit {
  // ==> Variables
  public size: NzButtonSize = 'large';

  public empleadoForm!: FormGroup;
  public filtrosForm!: FormGroup;

  public dataEmpleados!: Array<Empleado>;
  public showModal: boolean = false;
  public isEdit: boolean = false;
  public isSelected!: Empleado; // ==> Registro seleccionado

  constructor(
    private fb: FormBuilder,
    private service: EmpleadoService,
    private global: GlobalService
  ) {}

  ngOnInit(): void {
    // ==> Inicializando Form
    this.inicializeForm();

    // ==> Obtener data
    this.obtainData();
  }

  /**
   * Inicializando Form
   */
  inicializeForm() {
    this.empleadoForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  async obtainData() {
    const result: any = await this.service.get();
    const { ok, data } = result;

    // ==> Verificar petición
    if (ok) {
      this.dataEmpleados = data;
    } else {
      this.global.createNotification(
        'error',
        'Error',
        'Error when obtaining employees'
      );
    }
  }

  async validForm() {
    const valid = this.empleadoForm.valid;

    if (valid) {
      const dataForm = this.empleadoForm.value;

      const result: any = await this.service.post(dataForm);

      const { ok } = result;

      if (ok) {
        await this.service.craeteUser(dataForm);
        const exito = 'Información guardada correctamente';
        this.global.createNotification('success', 'Éxito', exito);
        this.obtainData();
        this.empleadoForm.reset();
        this.inicializeForm();
        this.showModal = false;
      } else {
        const error = 'Error al guardar registro, intente más tarde';
        this.global.createNotification('error', 'Error', error);
        this.empleadoForm.reset();
        this.inicializeForm();
        this.showModal = false;
      }
    } else {
      this.global.createNotification(
        'error',
        'Error',
        'Por favor, complete el formulario'
      );
    }
  }

  edit(data: Empleado) {
    this.isSelected = data;
    this.empleadoForm = this.fb.group({
      id: [{ value: data?.id, disabled: true }, [Validators.required]],
      nombre: [data?.nombre, Validators.required],
      apellido: [data?.apellido, Validators.required],
      correo: [data?.correo, [Validators.required, Validators.email]],
    });

    this.showModal = true; // ==> Show Modal
    this.isEdit = true;
  }

  async editRecord() {
    try {
      const valid = this.empleadoForm.valid;

      if (valid) {
        const dataForm = this.empleadoForm.value;

        const data: Empleado = {
          id: this.isSelected.id,
          ...dataForm,
        };

        const result: any = await this.service.put(data);

        const { ok } = result;

        if (ok) {
          const exito = 'Información modificada correctamente';
          this.global.createNotification('success', 'Éxito', exito);
          this.obtainData();
          this.empleadoForm.reset();
          this.inicializeForm();
          this.showModal = false;
          this.isEdit = false;
        } else {
          const error = 'Error al modificar registro, intente más tarde';
          this.global.createNotification('error', 'Error', error);
          this.empleadoForm.reset();
          this.inicializeForm();
          this.showModal = false;
        }
      } else {
        this.global.createNotification(
          'error',
          'Error',
          'Por favor, complete el formulario'
        );
      }
    } catch (er) {
      const error = 'Error al Editar Registro';
      this.global.createNotification('error', 'Error', error);
      console.error('|| ==> Error deleteRecord <== ||', er);
    }
  }

  async deleteRecord(data: Empleado) {
    try {
      const result: any = await this.service.delete(data);

      const { ok } = result;

      if (ok) {
        this.obtainData();
        const exito = 'Información eliminada correctamente';
        this.global.createNotification('success', 'Éxito', exito);
      } else {
        const error = 'Error al Eliminar Registro';
        this.global.createNotification('error', 'Error', error);
      }
    } catch (er) {
      const error = 'Error al Eliminar Registro';
      this.global.createNotification('error', 'Error', error);
      console.error('|| ==> Error deleteRecord <== ||', er);
    }
  }
}
