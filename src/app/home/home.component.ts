import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Garage } from '../entities/garageEntity';
import { AuthService } from '../services/auth.service';
import { GarageService } from '../services/garage.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  garages: Garage[] = [];
  favoris: Garage[] = [];
  subscription: Subscription | undefined;

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  constructor(
    private authService: AuthService,
    private garageService: GarageService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    let idUser = localStorage.getItem('id_user');
    this.garageService.getAllGarages().subscribe((resp) => {
      this.garages = resp;
      if (idUser !== null) {
        this.garageService.getUserFavoris(parseInt(idUser, 10)).subscribe(favoris => {
          this.garages.map(g => {
            favoris.map(f => {
              if (f.garage.id === g.id) {
                g.isFavoris = true;
                return;
              }
            })
          })
        })
      }
      
    });
    this.sharedService.currentMessage.subscribe((searchRes) => {
      if (searchRes) {
        this.garages = searchRes;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
