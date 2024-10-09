import { Component, ViewChild } from '@angular/core';
import { DatetimeFormatPipe } from './datetime-format.pipe';
import { DatetimeDirective } from '../datetime.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [DatetimeFormatPipe, DatetimeDirective]
})
export class AppComponent {
  formattedDateTime: Date | null = new Date(); 
  errorMessage: string | null = null;

  // Using ViewChild to access the DatetimeDirective
  @ViewChild(DatetimeDirective, { static: false }) datetimeDirective!: DatetimeDirective;

  constructor(private datetimeFormatPipe: DatetimeFormatPipe) {}

  updateDatetime(updatedDatetime: { date: string; time: string }) {
    const dateTimeStr = `${updatedDatetime.date} ${updatedDatetime.time}`;
    
    // Call parseStringToDate from the directive
    if (this.datetimeDirective) {
      this.formattedDateTime = this.datetimeDirective.parseStringToDate(dateTimeStr);
    }

    if (this.formattedDateTime) {
      this.errorMessage = null; 
    } else {
      this.errorMessage = 'Invalid date or time format. Please use dd-mm-yyyy and hh:mm format.';
    }
  }

  getFormattedDateTime(): string {
    if (this.formattedDateTime instanceof Date) {
      const formattedDateStr = this.formattedDateTime.toLocaleDateString('en-GB');
      const formattedTimeStr = this.formattedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${formattedDateStr} ${formattedTimeStr}`;
    }
    return ''; 
  }
}
