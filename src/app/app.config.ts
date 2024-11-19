import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  //TODO: look into this thing maybe we can change back from using ugly hash tags
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withHashLocation())]
};
