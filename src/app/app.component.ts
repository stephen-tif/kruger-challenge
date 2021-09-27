import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<router-outlet></router-outlet>',
  styles: [''],
})
export class AppComponent implements OnInit {
  // ==> Variables
  public isLoggedIn: boolean = false;

  constructor() {
    // ==> Verificar sesión
    this.checkSesion();
  }

  ngOnInit() {
    // Init
  }

  checkSesion() {
    try {
      // ==> Band de Sesión
      const logged = localStorage.getItem('sesion') || '';

      // ==> Verificar si existe sesión
      this.isLoggedIn = logged ? true : false;
    } catch (e) {
      console.error('|| ==> Error checkSesion <==', e);
    }
  }
}
