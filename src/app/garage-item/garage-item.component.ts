import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Garage } from '../entities/garageEntity';
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

  constructor(private garageService: GarageService) {}

  ngOnInit(): void {}

  addToFavorite(event: Event) {
    event.stopPropagation();
    let idUser = localStorage.getItem('id_user');
    
    if (this.garage && idUser !== null) {
      let garageId = this.garage.id;

      if (!this.garage.isFavori) {
        //garage can be added to list favorite
        this.garageService
          .addGarageToFavorite(this.garage.id, parseInt(idUser, 10))
          .subscribe((garageAdded) => {
            this.garageService.setIsFavori(garageId, true).subscribe(garag => console.log(garag)
            );
          });
      } else {
        // Get id of favorite garage
        this.garageService
          .getGarageFav(this.garage?.id, parseInt(idUser, 10))
          .subscribe((garageFav) => {
            // remove garage from list favorite
            garageFav.map((fav) => {
              this.garageService.removeGarageFromFav(fav.id).subscribe(() => {
                this.garageService.setIsFavori(garageId, false).subscribe();
              });
            });
          });
      }
    }
  }

  getGarageStatus() {
    if (this.garage !== undefined && this.garage.opening_hours) {
      const currentDay = this.getDay(new Date().getDay());
      this.openingHours = this.garage.opening_hours;
      this.garage.opening_hours.map((opening) => {
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
    const currentDate = new Date();
    if (currentDate.getHours() < start.getHours()) {
      return Status.CLOSED;
    } else if (
      currentDate.getHours() >= start.getHours() &&
      currentDate.getHours() <= end.getHours()
    ) {
      return Status.OPENED;
    }
    return Status.CLOSED;
  }

  getColorIcFav() {
    return this.garage && this.garage.isFavori ? 'accent' : 'primary';
  }
}
