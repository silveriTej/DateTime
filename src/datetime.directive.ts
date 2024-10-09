import { Directive, Input, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { DatetimeFormatPipe } from './app/datetime-format.pipe';

@Directive({
  selector: '[appDatetime]',
  standalone: true,
})
export class DatetimeDirective {
  private _formattedDateTime!: string;

  @Output() datetimeChanged = new EventEmitter<string>();

  @Input() set appDatetime(value: string) {
    if (!value) {
      console.error('Invalid input value for appDatetime. Expected a non-empty string.');
      this._formattedDateTime = ''; 
      this.updateDisplay(); 
      return; 
    }

    this._formattedDateTime = value;
    this.updateDisplay();
    this.emitDatetime();
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private datetimeFormatPipe: DatetimeFormatPipe
  ) {
    this.createInitialDisplay();
  }

  private createInitialDisplay() {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '');
  }

  private updateDisplay() {
    try {
      const dateDisplay = this.datetimeFormatPipe.transform(this._formattedDateTime, 'date');
      const timeDisplay = this.datetimeFormatPipe.transform(this._formattedDateTime, 'time');

      if (!dateDisplay || !timeDisplay) {
        throw new Error('Invalid date or time format returned from DatetimeFormatPipe.');
      }

      const htmlContent = `
        <div class="datetime-container">
          <span class="date-display"><i class="fas fa-calendar-alt"></i> ${dateDisplay}</span>
          <span class="time-display"><i class="fas fa-clock"></i> ${timeDisplay}</span>
        </div>
      `;

      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', htmlContent);
      this.applyStyles();
    } catch (error: unknown) {  
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error(errorMessage);
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '<div class="error-message">Error displaying date and time.</div>');
    }
  }

  private emitDatetime() {
    this.datetimeChanged.emit(this._formattedDateTime);
  }

  private applyStyles() {
    // Your existing styling logic
  }

  // Add the parseStringToDate method here
  parseStringToDate(dateTimeStr: string): Date | null {
    try {
      const [datePart, timePart] = dateTimeStr.split(' ');
      const [day, month, year] = datePart.split('-');
      const [hours, minutes] = timePart.split(':');

      if (!day || !month || !year || !hours || !minutes) {
        throw new Error('Missing date or time parts');
      }

      const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      return date;
    } catch (error) {
      console.error((error as Error).message); 
      return null; 
    }
  }
}
