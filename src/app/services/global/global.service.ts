import { Injectable } from '@angular/core';

// ==> NG Zorro
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public confirmModal?: NzModalRef; // For testing by now

  constructor(
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  /**
   * Funcion para crear Notificicacines
   * @param type <string> Tipo de Notificación
   * @param titule <string> Titulo de la Notificación
   * @param msg <string> Mensaje de la Notificación
   */
  createNotification(type: string, titule: string, msg: string): void {
    this.notification.create(type, titule, msg);
  }

  /**
   * Funcion para crear Modal de Confirmación
   * @param title <string> Titulo de la Notificación
   * @param msg <string> Mensaje de la Notificación
   * @param okFunction <Function> Funcion OK
   */
  createModalConfirm(title: string, msg: string, okFunction: Function) {
    this.confirmModal = this.modal.confirm({
      nzTitle: title,
      nzContent: msg,
      nzOnOk: () => okFunction(),
    });
  }

  /**
   * Generador de codigos
   * @returns Ramdom Number
   */
  getRndInteger() {
    return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  }
}
