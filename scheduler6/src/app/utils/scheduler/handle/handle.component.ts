import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-scheduler-handle',
  templateUrl: './handle.component.html',
  styleUrls: ['./handle.component.scss']
})
export class HandleComponent implements OnInit {
  @Input() ondrag;
  @Input() ondragstop;
  @Input() ondragstart;
  x = 0;
  listenerMouseMove;
  listenerMouseUp;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  @HostListener('mouseDown', ['$event'])
  doOnMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.x = event.pageX;
    this.listenerMouseMove = this.renderer.listen('window', 'mousemove', (ev) => this.onMouseMove(ev));
    this.listenerMouseUp = this.renderer.listen('window', 'mouseup', (ev) => this.onMouseUp(ev));
    if (this.ondragstart) {
      this.ondragstart();
    }
  }

  onMouseMove($event: MouseEvent) {
    const delta = $event.pageX - this.x;
    this.ondrag(delta);
  }

  onMouseUp($event: MouseEvent) {
    this.listenerMouseMove();
    this.listenerMouseUp();
    if (this.ondragstop) {
      this.ondragstop();
    }
  }
}
