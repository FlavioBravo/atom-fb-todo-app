import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ModalService } from '../services/modal/modal.service';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  private countRequest = 0;
  loaderRef: any;
  constructor(private modalService: ModalService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.countRequest) {
      this.loaderRef = this.modalService.open(LoaderComponent);
    }
    this.countRequest++;
    return next.handle(request).pipe(
      finalize(() => {
        this.countRequest--;
        if (!this.countRequest) {
          this.loaderRef.close();
        }
      })
    );
  }
}
