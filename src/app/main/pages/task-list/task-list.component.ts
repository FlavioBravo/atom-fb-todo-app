import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateTaskModalComponent } from '../../components/create-task-modal/create-task-modal.component';
import { Response } from '../../models/response';
import { Task } from '../../models/task';
import { ModalService } from '../../services/modal/modal.service';
import { TaskService } from '../../services/task.service';
import {
  COMPLETED_STATUS,
  COMPLETE_ACTION,
  EDIT_ACTION,
} from '../../utils/constants';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  taskList: Task[] = new Array<Task>();

  searchForm = this.fb.group({
    text: [''],
  });

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList(): void {
    this.taskService.getTaskList().subscribe((res: Response) => {
      this.taskList = res.payload;
    });
  }

  openCreateTaskModal(): void {
    const dialogRef = this.modalService.open(CreateTaskModalComponent, {
      data: {
        title: 'Agregar tarea',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.taskService.createTask(data).subscribe((res: Response) => {
          if (res?.success) {
            this.getTaskList();
          }
        });
      }
    });
  }

  search(): void {
    const text = this.searchForm.get('text')?.value;
    if (text) {
      this.taskList = this.taskList.filter((task) =>
        task.title.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.getTaskList();
    }
  }

  handleClick(event: any): void {
    switch (event.action) {
      case COMPLETE_ACTION:
        const doneTask: Task = { ...event.task };
        doneTask.status = COMPLETED_STATUS;
        this.taskService.editTask(doneTask).subscribe((res: Response) => {
          if (res?.success) {
            this.getTaskList();
          }
        });
        break;
      case EDIT_ACTION:
        const editTask: Task = { ...event.task };
        this.taskService.editTask(editTask).subscribe((res: Response) => {
          if (res?.success) {
            this.getTaskList();
          }
        });
        break;
      default:
        const deleteTask: Task = { ...event.task };
        if (deleteTask?.id) {
          this.taskService
            .deleteTask(deleteTask.id)
            .subscribe((res: Response) => {
              if (res?.success) {
                this.getTaskList();
              }
            });
        }
        break;
    }
  }
}
