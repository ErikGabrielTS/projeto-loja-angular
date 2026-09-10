import { Component, inject } from '@angular/core';

import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  private toastService = inject(ToastService);

  visible() {
    return this.toastService.visible();
  }

  message() {
    return this.toastService.message();
  }
}
