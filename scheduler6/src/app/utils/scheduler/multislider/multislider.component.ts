import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-scheduler-multislider',
  templateUrl: './multislider.component.html',
  styleUrls: ['./multislider.component.scss']
})
export class MultisliderComponent implements OnInit {
  @Input() slots;
  @Input() max;
  @Input() min;
  @Input() tick;
  @Input() defaultvalue;
  @Input() day;
  hoverElementWidth;
  leftForHoverElement;
  elOffX;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // used for calculating relative click-events
    this.elOffX = this.el.nativeElement.getBoundingClientRect().left;

    this.hoverElementWidth = this.valToPixel(this.defaultvalue);


  }

  valToPixel(val) {
    const percent = val / (this.max - this.min);
    return Math.floor(percent * this.el.nativeElement.clientWidth + 0.5);
  }

  pixelToVal(pixel) {
    const percent = pixel / this.el.nativeElement.clientWidth;
    return Math.floor(percent * (this.max - this.min) + 0.5);
  }

  round(n) {
    return this.tick * Math.round(n / this.tick);
  }

  addSlot(start, stop) {
    start = start >= this.min ? start : this.min;
    stop = stop <= this.max ? stop : this.max;
    this.slots.push({start: start, stop: stop, day: this.day});
  }

  @HostListener('mousemove', ['$event'])
  doOnMouseMove(event: MouseEvent) {
    this.leftForHoverElement = event.pageX - this.elOffX - this.hoverElementWidth / 2 + 'px';
  }

  onClickOnAddButton($event: MouseEvent) {
    const pixelOnClick = $event.pageX - this.elOffX;
    const valOnClick = this.pixelToVal(pixelOnClick);

    const start = this.round(valOnClick - this.defaultvalue / 2);
    const stop = start + this.defaultvalue;

    this.addSlot(start, stop);
  }
}
