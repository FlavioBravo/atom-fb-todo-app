import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { ModalRef } from '../modal-ref';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

export interface ModalConfig {
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  /**
   * Open a custom component in an overlay
   */
  open<T>(component: ComponentType<T>, config?: ModalConfig): ModalRef {
    // Globally centered position strategy
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
    });

    // Create dialogRef to return
    const modalRef = new ModalRef(overlayRef);

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: ModalRef, useValue: modalRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return modalRef;
  }
}
