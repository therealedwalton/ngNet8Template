import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Identity/auth-service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: true
})
export class HomeComponent implements OnInit {

  public isSignedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.onStateChanged().forEach((state: boolean) => {
      this.isSignedIn = state;
    });
    this.authService.isSignedIn().forEach((signedIn: boolean) => {
      this.isSignedIn = signedIn;
    });
  }

}
