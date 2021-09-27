import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ==> Services
import { GlobalService } from '../../services/global/global.service';
import { LoginService } from '../../services/Login/login.service';

// ==> Components
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // ==> Form variable
  public loginForm!: FormGroup; // Para logerarse

  constructor(
    private fb: FormBuilder,
    private services: LoginService,
    private global: GlobalService,
    private route: Router,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    // ==> Inicializando Form
    this.inicializeForm();
  }

  /**
   * Inicializando Form
   */
  inicializeForm() {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }

  /**
   * Validar Form and Verificar Usuario
   */
  async login() {
    const valid = this.loginForm.valid;

    if (valid) {
      const valueForm = this.loginForm.value;

      // ==> Obtener Datos de Form
      const user = valueForm?.user || '';
      const pass = valueForm?.pass || '';

      // ==> Verificar si existe Usuario
      const result: any = await this.services.loginWithUserAndPass(user, pass);

      // ==> Destructurar Result
      const { ok, type } = result;

      if (ok) {
        const userData = { userName: user, time: new Date(), type: type };
        await localStorage.setItem('sesion', JSON.stringify(userData) || ''); //==> Agregar bandera de Sesión
        this.app.checkSesion();
        this.route.navigate(['/empleados']);
      } else {
        this.global.createNotification(
          'error',
          'Error',
          'Usuario o contraseña incorrectos'
        );
      }
    } else {
      this.global.createNotification(
        'error',
        'Error',
        'Por favor, complete el formulario'
      );
    }
  }
}
