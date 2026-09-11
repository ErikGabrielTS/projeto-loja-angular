import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  visible = signal(false);
  message = signal('');

  private timeout?: ReturnType<typeof setTimeout>;

  show(message: string, duration: number = 3000) {
    this.message.set(message);
    this.visible.set(true);

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.close();
    }, duration);
  }

  close() {
    this.visible.set(false);
  }
}