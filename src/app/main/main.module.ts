import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TableComponent } from './components/table/table.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { MainComponent } from './main.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { TagComponent } from './components/tag/tag.component';

@NgModule({
  declarations: [
    TableComponent,
    TaskListComponent,
    MainComponent,
    HeaderComponent,
    CreateTaskModalComponent,
    DropdownComponent,
    ConfirmModalComponent,
    TagComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class MainModule {}
