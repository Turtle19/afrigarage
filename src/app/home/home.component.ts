import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Garage } from '../entities/garageEntity';
import { AuthService } from '../services/auth.service';
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  garages: Garage[] = [];

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  constructor(
    private authService: AuthService,
    private garageService: GarageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.garageService.getAllGarages().subscribe((resp) => {
      this.garages = resp;
    });
  }
}
