import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _routeURL = environment.BASE_URL;

  constructor(private readonly _http: HttpClient) {}

  getTaskList(): Observable<Response> {
    return this._http
      .get(`${this._routeURL}task`)
      .pipe(map((response: any) => response));
  }

  createTask(data: Task): Observable<Response> {
    return this._http
      .post(`${this._routeURL}task/add-task`, data)
      .pipe(map((response: any) => response));
  }

  editTask(data: Task): Observable<Response> {
    return this._http
      .put(`${this._routeURL}task/edit-task`, data)
      .pipe(map((resp: any) => resp));
  }

  deleteTask(taskId: string): Observable<Response> {
    return this._http
      .delete(`${this._routeURL}task/delete-task/${taskId}`)
      .pipe(map((resp: any) => resp));
  }
}
