import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalRef } from '../../services/modal-ref';
import { DIALOG_DATA } from '../../services/modal/modal.service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css'],
})
export class CreateTaskModalComponent implements OnInit {
  title = '';
  taskForm = this.fb.group({
    title: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    description: ['', [Validators.required]],
  });

  constructor(
    private dialogRef: ModalRef,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    if (this.data?.task) {
      this.taskForm.patchValue({ ...this.data.task });
    }
  }

  save() {
    this.dialogRef.close(this.taskForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
