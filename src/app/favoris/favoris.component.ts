import { Component, OnInit } from '@angular/core';
import { Favoris, Garage } from '../entities/garageEntity';
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css'],
})
export class FavorisComponent implements OnInit {
  garageFavoris: Garage[] = [];

  constructor(private garageService: GarageService) {}

  ngOnInit(): void {
    let idUser = localStorage.getItem('id_user');

    if (idUser !== null) {
      this.garageService
        .getUserFavoris(parseInt(idUser, 10))
        .subscribe((favoris) => {
          if (favoris !== null) {
            favoris.map(f => {
              this.garageService.getGarageById(f.garage.id).subscribe(garage => {
                garage.isFavoris = true;
                this.garageFavoris.push(garage);
              })
            })
          }
        });
    }
  }
}
