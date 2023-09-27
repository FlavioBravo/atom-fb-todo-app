import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { ModalService } from '../../services/modal/modal.service';
import {
  COMPLETE_ACTION,
  DELETE_ACTION,
  EDIT_ACTION,
} from '../../utils/constants';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() list: any[] = [];
  @Output() resolvedClick = new EventEmitter<any>();

  constructor(private modalService: ModalService) {}

  ItemById(index: number, item: any) {
    return item.id;
  }

  handleClick(event: string, item: any): void {
    switch (event) {
      case EDIT_ACTION:
        this.openEditModal(item);
        break;

      default:
        this.openConfirmModal(item);
        break;
    }
  }

  completeTask(item: Task): void {
    this.resolvedClick.emit({ task: item, action: COMPLETE_ACTION });
  }

  openEditModal(item: any): void {
    const dialogRef = this.modalService.open(CreateTaskModalComponent, {
      data: {
        title: 'Editar tarea',
        task: item,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const editData: Task = { ...item, ...data };
        this.resolvedClick.emit({ task: editData, action: EDIT_ACTION });
      }
    });
  }

  openConfirmModal(item: any): void {
    const dialogRef = this.modalService.open(ConfirmModalComponent, {
      data: {
        title: 'Eliminar tarea',
        question: '¿Estás seguro de realizar esta acción?',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.resolvedClick.emit({ task: item, action: DELETE_ACTION });
      }
    });
  }
}
