import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTime'
})
export class UnixTimePipe implements PipeTransform {
  transform(value: any): any {
    if (!value || typeof value !== 'number') {
      return value;
    }
    let day = Math.floor(value / (24 * 3600));
    value -= day * 24 * 3600;
    let hour = Math.floor(value / 3600);
    value -= hour * 3600;
    let min = Math.floor(value / 60);
    value -= min * 60;
    let sec = Math.floor(value);
    return (day < 10 ? '0' + day : day) + ' : ' +
    (hour < 10 ? '0' + hour : hour) + ' : ' +
    (min < 10 ? '0' + min : min) + ' : ' +
    (sec < 10 ? '0' + sec : sec);
  }
}
