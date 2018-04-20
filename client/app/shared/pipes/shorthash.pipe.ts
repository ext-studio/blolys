import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortHash'
})
export class ShortHashPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (!value || typeof value !== 'string') {
            return value;
        }
        return value.slice(0, 5) + '*****' + value.slice(-5);
    }
}