import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unixTime'
})
export class UnixTimePipe implements PipeTransform {
    transform(value: any): any {
        if (!value || typeof value !== 'number') {
            return value;
        }
        const res = value * 1000;
        value = (new Date().getTime() - value * 1000) / 1000;
        const min = Math.floor(value / 60);
        const sec = Math.floor(value);
        if (min > 59) {
            return this.getTime(res);
        }
        if (window.location.href.indexOf('en') >= 0) {
            if (min > 0) {
                return min + ' minutes ago';
            } else if (sec > 10) {
                return sec + ' seconds ago';
            } else if (sec >= 0) {
                return 'just now';
            }
        } else {
            if (min > 0) {
                return min + ' 分钟前';
            } else if (sec > 10) {
                return sec + ' 秒前';
            } else if (sec >= 0) {
                return '刚刚';
            }
        }
    }
    getTime (time: any) {
        time = new Date(time);
        const year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        month = this.PrefixInteger(month, 2);
        day = this.PrefixInteger(day, 2);
        hour = this.PrefixInteger(hour, 2);
        minute = this.PrefixInteger(minute, 2);
        second = this.PrefixInteger(second, 2);
        const times = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return times;
    }
    PrefixInteger(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
}
