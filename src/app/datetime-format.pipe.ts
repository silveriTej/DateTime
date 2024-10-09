import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetimeFormat',
  standalone: true,
})
export class DatetimeFormatPipe implements PipeTransform {
  transform(value: string, type: 'date' | 'time'): string {
    if (!value) return '';

    const [datePart, timePart] = value.split(' ');

    if (type === 'date') {
      const [day, month, year] = datePart.split('/');
      // Change the separator from '/' to '-'
      return `${day}-${month}-${year}`;
    } else if (type === 'time') {
      return timePart;
    }
    return '';
  }
}
