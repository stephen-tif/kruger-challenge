import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ==> Components
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  // Variables
  public usuario!: any; // Guardar Usuario logueado

  constructor(private route: Router, private app: AppComponent) {}

  ngOnInit(): void {}

  // Cerrar sesion
  logout() {
    localStorage.removeItem('sesion');
    this.app.checkSesion();

    this.route.navigate(['/login']);
  }
}
