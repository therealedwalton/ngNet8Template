import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './Identity/auth-service';
import { Router } from '@angular/router';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  public isSignedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.onStateChanged().forEach((state: boolean) => {
      this.isSignedIn = state;
    });
    this.authService.isSignedIn().forEach((signedIn: boolean) => {
      this.isSignedIn = signedIn;
    });
  }

  signOut() {
    if (this.isSignedIn) {
      this.authService.signOut().forEach(response => {
        if (response) {
          this.router.navigateByUrl('');
        }
      });
    }
  }

  title = 'angularapp.client';
}
