import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slotByDay'
})
export class SlotByDayPipe implements PipeTransform {

  transform(input: any, day: any): any {
    const ret = [];
    input.forEach(function(el){
      if (el.day === day) {
        ret.push(el);
      }
    });
    return ret;
  }

}
