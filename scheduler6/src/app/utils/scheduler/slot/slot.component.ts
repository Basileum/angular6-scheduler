import {Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-scheduler-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  @Input() min;
  @Input() max;
  @Input() model;
  @Input() slots;
  @Input() tick;
  offsetCalculated;
  widthCalculated;
  container;
  resizeDirectionIsStart;
  valuesOnDragStart;
  booleanForActiveClass;
  listenerMouseMove;
  listenerMouseUp;
  x=0;
  modeDrag;
  modeResize;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostBinding('style.left') left;
  @HostBinding('style.width') width;

  ngOnInit() {
    this.container = this.el.nativeElement.offsetParent;
    this.resizeDirectionIsStart = true;
    this.valuesOnDragStart = {start: this.model.start, stop: this.model.stop};
    this.setPosition();

  }


  valToPixel(val) {
    const percent = val / (this.max - this.min);
    return Math.floor(percent * this.container.clientWidth + 0.5);
  }

  valToPercent(val) {
    return val / (this.max - this.min) * 100;
  }

  pixelToVal(pixel) {
    const percent = pixel / this.container.clientWidth;
    return Math.floor(percent * (this.max - this.min) + 0.5);
  }

  round(n) {
    return this.tick * Math.round(n / this.tick);
  }

  setPosition() {
    this.offsetCalculated = this.valToPercent(this.model.start) + '%';
    this.widthCalculated = this.valToPercent(this.model.stop - this.model.start)  + '%';
    this.left = this.offsetCalculated;
    this.width = this.widthCalculated;
  }

  stopDrag() {
    // this prevents user from accidentally
    // adding new slot after resizing or dragging
    // setTimeout(function() {
      // angular.element(container).removeAttr('no-add');
    // }, 500);

    // element.removeClass('active');
    // angular.element(container).removeClass('dragging');

    this.mergeOverlaps();
  }


  startResizeStart() {
    this.modeResize=true;
    this.resizeDirectionIsStart = true;
    this.startDrag();
  }

  startResizeStop() {
    this.modeResize=true;
    this.resizeDirectionIsStart = false;
    this.startDrag();
  }

  startDrag() {
    this.booleanForActiveClass = true;

    // angular.element(container).addClass('dragging');
    // angular.element(container).attr('no-add', true);

    this.valuesOnDragStart = {start: this.model.start, stop: this.model.stop};
  }


  resize(d) {
    if (this.resizeDirectionIsStart) {

      const newStart = this.round(this.pixelToVal(this.valToPixel(this.valuesOnDragStart.start) + d));

      if (newStart <= this.model.stop && newStart >= this.min) {
        this.model.start = newStart;
        this.checkForFlip();
        this.setPosition();
      }

    } else {

      const newStop = this.round(this.pixelToVal(this.valToPixel(this.valuesOnDragStart.stop) + d));

      if (newStop >= this.model.start && newStop <= this.max) {
        this.model.stop = newStop;
        this.checkForFlip();
        this.setPosition();
      }
    }
  }

  drag(d) {
    const oldVal = this.model.stop - this.model.start;
    const newVal = this.round(this.pixelToVal(this.valToPixel(this.valuesOnDragStart.start) + d));

    if (newVal >= this.min && newVal + (oldVal) <= this.max) {
      this.model.start = newVal;
      this.model.stop = newVal + oldVal;
    }
    this.setPosition();
  }


  checkForFlip() {
    if (this.model.start >= this.model.stop) {

      const tmp = this.valuesOnDragStart.stop;
      this.valuesOnDragStart.stop = this.valuesOnDragStart.start;
      this.valuesOnDragStart.start = tmp;

      this.resizeDirectionIsStart = !this.resizeDirectionIsStart;
    }
  }

  mergeOverlaps() {
    this.slots.forEach(function(el) {
      if (el !== this.model && el.day === this.model.day) {

        // model is inside another slot
        if (el.stop >= this.model.stop && el.start <= this.model.start) {
          this.slots.splice(this.slots.indexOf(el), 1);
          this.model.stop = el.stop;
          this.model.start = el.start;
        } else if (this.model.stop >= el.stop && this.model.start <= el.start) {
          this.slots.splice(this.slots.indexOf(el), 1);
        } else if (el.stop >= this.model.start && el.stop <= this.model.stop ) {
          this.slots.splice(this.slots.indexOf(el), 1);
          this.model.start = el.start;
        } else if (el.start >= this.model.start && el.start <= this.model.stop) {
          this.slots.splice(this.slots.indexOf(el), 1);
          this.model.stop = el.stop;
        }
      }
    });
  }

  deleteSelf() {
    // angular.element(container).removeClass('dragging');
    // angular.element(container).removeClass('slot-hover');
    // this.slots.splice(this.slots.indexOf(this.model), 1);
  }

  doOnMouseDownOnHandleLeft(event: MouseEvent) {
    event.preventDefault();
    this.x = event.pageX;
    this.listenerMouseMove = this.renderer.listen('window', 'mousemove', (ev) => this.onMouseMove(ev));
    this.listenerMouseUp = this.renderer.listen('window', 'mouseup', (ev) => this.onMouseUp(ev));
    this.startResizeStart()
  }

  doOnMouseDownOnHandleContent(event: MouseEvent) {
    event.preventDefault();
    this.x = event.pageX;
    this.listenerMouseMove = this.renderer.listen('window', 'mousemove', (ev) => this.onMouseMove(ev));
    this.listenerMouseUp = this.renderer.listen('window', 'mouseup', (ev) => this.onMouseUp(ev));
    this.startDrag();
  }

  doOnMouseDownOnHandleRight(event: MouseEvent) {
    event.preventDefault();
    this.x = event.pageX;
    this.listenerMouseMove = this.renderer.listen('window', 'mousemove', (ev) => this.onMouseMove(ev));
    this.listenerMouseUp = this.renderer.listen('window', 'mouseup', (ev) => this.onMouseUp(ev));
    this.startResizeStop()
  }

  onMouseMove($event: MouseEvent) {
    const delta = $event.pageX - this.x;
    if(this.modeResize){
      this.resize(delta);
    } else{
      this.drag(delta);
    }

  }

  onMouseUp($event: MouseEvent) {
    this.listenerMouseMove();
    this.listenerMouseUp();
    if(this.modeResize){
      this.modeResize = false;
    } else {
      this.stopDrag();
    }

  }

}
