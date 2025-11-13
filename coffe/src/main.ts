import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient} from '@angular/common/http';
bootstrapApplication(AppComponent, {
  providers: [provideIonicAngular(), provideRouter(routes),provideHttpClient()],
});

