import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intToTime'
})
export class IntToTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return this.pad(hours, 2) + ':' + this.pad(minutes, 2);
  }

  pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

}
