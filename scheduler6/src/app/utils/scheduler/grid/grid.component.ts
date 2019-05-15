import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-scheduler-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() min;
  @Input() max;
  @Input() tick;
  @Input() noLabels;
  tickcount;
  ticksize;

  constructor() { }

  ngOnInit() {
    this.tickcount = (this.max - this.min) / this.tick;
    this.ticksize = 100 / this.tickcount;
  }

  range(n) {
    return new Array(n);
  }

}
