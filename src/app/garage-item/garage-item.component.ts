import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Favoris, Garage } from '../entities/garageEntity';
import { OpeningHours } from '../entities/openinHours';
import { GarageService } from '../services/garage.service';
import { DayOfWeek, Status } from '../utilis/utils';

@Component({
  selector: 'app-garage-item',
  templateUrl: './garage-item.component.html',
  styleUrls: ['./garage-item.component.css'],
})
export class GarageItemComponent implements OnInit {
  @Input() garage: Garage | undefined;
  @ViewChild('button') button: MatButton | undefined;
  openingHours: OpeningHours[] = [];
  url = environment.urlBack;

  constructor(private garageService: GarageService) {}

  ngOnInit(): void {}

  addToFavorite(event: Event) {
    event.stopPropagation();
    let idUser = localStorage.getItem('id_user');
    if (this.garage !== undefined && idUser !== null) {
      this.garageService
        .addGarageToFavorite(this.garage.id, parseInt(idUser, 10))
        .subscribe((added) => {
          if (added !== null && this.garage !== undefined) {
            this.garage.isFavoris = true;
            Swal.fire('Garage ' + this.garage.name, 'a été bien ajouté à vos favoris', 'success');
          }
        });
    }
  }

  deleteFavorite(event: Event) {
    event.stopPropagation();
    this.garageService.getIdFavori(this.garage?.id).subscribe((favoriToRemove) => {
      if (favoriToRemove !== null) {
        favoriToRemove.map((fav) =>
          this.garageService.removeFavori(fav.id).subscribe((removed) => {
            if (this.garage !== undefined) {
              this.garage.isFavoris = false;
              Swal.fire('Garage ' + this.garage.name, 'a bien été retiré de vos favoris', 'warning');
            }
          })
        );
      }
    });
  }

  getGarageStatus() {
    if (this.garage !== undefined && this.garage.opening_hours) {
      const currentDay = this.getDay(new Date().getDay());
      this.openingHours = this.garage.opening_hours;
      this.openingHours.map((opening) => {
        if (opening.day_of_the_week === currentDay) {
          return this.isOpened(opening.opening_hour, opening.closing_hour);
        }
        return Status.CLOSED;
      });
    }
    return Status.NOT_DEFINED;
  }

  getDay(value: number) {
    switch (value) {
      case 1:
        return DayOfWeek.MONDAY;
      case 2:
        return DayOfWeek.TUESDAY;
      case 3:
        return DayOfWeek.WEDNESDAY;
      case 4:
        return DayOfWeek.THURSDAY;
      case 5:
        return DayOfWeek.FRIDAY;
      case 6:
        return DayOfWeek.SATUDAY;
      case 7:
        return DayOfWeek.SUNDAY;
      default:
        return '';
    }
  }

  isOpened(start: Date, end: Date) {
    const dateDeb = new Date(start);
    const dateFin = new Date(end);
    const currentDate = new Date();
    if (currentDate.getHours() < dateDeb.getHours()) {
      return Status.CLOSED;
    } else if (
      currentDate.getHours() >= dateDeb.getHours() &&
      currentDate.getHours() <= dateFin.getHours()
    ) {
      return Status.OPENED;
    }
    return Status.CLOSED;
  }
}
