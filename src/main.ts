import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { DatetimeFormatPipe } from './app/datetime-format.pipe';
import { DatetimeDirective } from './datetime.directive';


const appConfig = {
  providers: [DatetimeFormatPipe, DatetimeDirective] 
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Bootstrap error:', err));
