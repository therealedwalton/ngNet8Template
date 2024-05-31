import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthService } from './app/Identity/auth-service';
import { AuthGuard } from './app/Identity/guard';
import { AuthInterceptor } from './app/Identity/interceptor';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule),
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: (router: Router) => {
                return new AuthInterceptor(router);
            },
            multi: true,
            deps: [Router]
        },
        AuthGuard,
        AuthService,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
