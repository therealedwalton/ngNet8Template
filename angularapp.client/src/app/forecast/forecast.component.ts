import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrl: './forecast.component.css',
    standalone: true,
    imports: [NgIf, NgFor]
})
export class ForecastComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast', {
      withCredentials: true // can use an interceptor for this as well
    }).forEach(
      (result) => {
        this.forecasts = result;
      }).catch(
        (error) => {
          console.error(error);
        }
      );
  }
}
