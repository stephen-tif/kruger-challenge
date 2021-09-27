import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable((observer) => {
      // ==> Band de Sesión
      const logged = localStorage.getItem('sesion') || '';

      // ==> Verificar si existe sesión
      if (logged) {
        observer.next(true);
        observer.complete();
      } else {
        observer.next(false);
        // ==> Si no está logueado, mandar al login.
        this.router.navigate(['login']);
        observer.complete();
      }
    });
  }
}
