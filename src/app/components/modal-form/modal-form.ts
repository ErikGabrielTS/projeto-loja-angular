import { ElementRef, Component, viewChild, signal } from '@angular/core';
import { Produto } from '../../types/produto';

@Component({
  selector: 'app-modal-form',
  imports: [],
  templateUrl: './modal-form.html',
  styleUrl: './modal-form.css',
})
export class ModalForm {
  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialogElement');
  listaProdutos = signal<Produto[]>([]);

  ngOnInit() {
    
  }

  isEdit = false;

  openModal(): void {
    this.dialog().nativeElement.showModal();
  }

  closeModal(): void {
    this.dialog().nativeElement.close();
  }

  onSubmit(): void {}
}
