import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TableComponent } from './components/table/table.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { MainComponent } from './main.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { TagComponent } from './components/tag/tag.component';
import { TaskService } from './services/task.service';
import { GlobalInterceptor } from './intercetor/global.interceptor';
import { LoaderComponent } from './components/loader/loader.component';

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
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },
  ],
})
export class MainModule {}
