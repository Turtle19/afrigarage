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
    console.log(
      'id user in localstorage ==> ' + localStorage.getItem('id_user')
    );
    const idUser = localStorage.getItem('id_token');
    if (this.garage && idUser !== null) {
      
      console.log('bef');
      if (this.button) {
        
        // garage can be added to list favorite
        if (this.button.color !== 'accent') {
          console.log('here');
          
          this.garageService
            .addGarageToFavorite(this.garage.id, parseInt(idUser, 10))
            .subscribe((garageAdded) => {
              console.log(garageAdded);
              if (this.button) {
                this.button.color = 'accent';
              }
            });
        } else {
          // Get id of favorite garage
          this.garageService
            .getGarageFav(this.garage?.id, 2)
            .subscribe((garageFav) => {
              // remove garage from list favorite
              garageFav.map(fav => {
                this.garageService.removeGarageFromFav(fav.id).subscribe(() => {
                  if (this.button) {
                    this.button.color = 'primary';
                    console.log('removed');
                  }
                })
              })
           
            });
        }
      }
    }
  }

  getGarageStatus() {
    if (this.garage !== undefined) {
      const currentDay = this.getDay(new Date().getDay());
      this.openingHours = this.garage.opening_hours;
      this.garage.opening_hours.map((opening) => {
        if (opening.day_of_the_week === currentDay) {
          return this.isOpened(opening.opening_hour, opening.closing_hour);
        }
        return Status.CLOSED;
      });
    }
    return Status.CLOSED;
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

  getColorIcFav() {}
}
