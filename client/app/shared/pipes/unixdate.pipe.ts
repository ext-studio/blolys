import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unixDate'
})
export class UnixDatePipe implements PipeTransform {
    transform(value: any): any {
        if (!value || typeof value !== 'number') {
            return value;
        }
        return new Date(value * 1000);
    }
}