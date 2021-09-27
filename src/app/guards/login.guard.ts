import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable((observer) => {
      // ==> Band de Sesión
      const logged = localStorage.getItem('sesion') || '';

      // ==> Verificar si existe sesión
      if (logged) {
        observer.next(false);
        // ==> Si está logueado, mandar a la Pantalla Principal.
        this.router.navigate(['empleados']);
        observer.complete();
      } else {
        observer.next(true);
        observer.complete();
      }
    });
  }
}
