import { Component, Inject } from '@angular/core';
import { ModalRef } from '../../services/modal-ref';
import { DIALOG_DATA } from '../../services/modal/modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  constructor(private dialogRef: ModalRef, @Inject(DIALOG_DATA) public data: any) {}

  save() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
