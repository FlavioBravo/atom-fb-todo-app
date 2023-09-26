import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import * as Mousetrap from 'mousetrap';
import { DELETE_ACTION, EDIT_ACTION } from '../../utils/constants';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Output() resolvedClick = new EventEmitter<string>();
  isOpen = false;
  mousetrap = new Mousetrap(this.eRef.nativeElement);

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  constructor(private readonly eRef: ElementRef) {}

  ngOnInit(): void {
    this.mousetrap.bind('esc', () => {
      this.toggle();
    });
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  edit(): void {
    this.resolvedClick.emit(EDIT_ACTION);
  }

  delete(): void {
    this.resolvedClick.emit(DELETE_ACTION);
  }

  ngOnDestroy(): void {
    this.mousetrap.unbind('esc');
  }
}
