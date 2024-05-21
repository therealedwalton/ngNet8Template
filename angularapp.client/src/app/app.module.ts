import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './Identity/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './Identity/auth-service';
import { AuthGuard } from './Identity/guard';
import { Router } from '@angular/router';
import { AuthInterceptor } from './Identity/interceptor';
import { HomeComponent } from './home/home.component';
import { ForecastComponent } from './forecast/forecast.component';
import { RegisterComponent } from './Identity/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterComponent,
    HomeComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useFactory: (router: Router) => {
      return new AuthInterceptor(router);
    },
    multi: true,
    deps: [Router]
  },
    AuthGuard,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
