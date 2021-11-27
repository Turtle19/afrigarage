import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Garage } from '../entities/garageEntity';
import { GarageService } from '../services/garage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogRDVComponent } from '../dialog-rdv/dialog-rdv.component';
import { Service } from '../entities/serviceEntity';
import { Booking } from '../entities/booking';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-garage-detail',
  templateUrl: './garage-detail.component.html',
  styleUrls: ['./garage-detail.component.css'],
})
export class GarageDetailComponent implements OnInit {
  garage: Garage | undefined;
  garageBookings: Booking[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private garageService: GarageService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const garageId = this.route.snapshot.paramMap.get('id');
    let idUser = localStorage.getItem('id_user');
    if (garageId !== null) {
      this.garageService.getGarageById(parseInt(garageId, 10)).subscribe((garage) => {
        if (idUser !== null) {
          this.garageService.getUserFavoris(parseInt(idUser, 10)).subscribe((favoris) => {
            favoris.map((fav) => {
              if (fav.garage.id === garage.id) {
                garage.isFavoris = true;
                return;
              }
            });
          });
          this.garage = garage;
          this.bookingService.getGarageBookings(this.garage.id).subscribe(bookings => {
            console.log(bookings);
            bookings.map(booking => {
              if (booking.user === null) { // that means booking is available
                this.garageBookings.push(booking);
              }
            })
          })
        }
      });
    }
  }

  getBookingHour(date: Date){
    const dateToDisplay = new Date(date);
    let hour = dateToDisplay.getHours() < 10 ? '0' + dateToDisplay.getHours() : dateToDisplay.getHours();
    let min = dateToDisplay.getMinutes() < 10 ? '0' + dateToDisplay.getMinutes() : dateToDisplay.getMinutes();
    return hour + ":" + min;
  }

  openDialogRdv(booking: Booking) {
    const dialogRef = this.dialog.open(DialogRDVComponent, {
      width: '550px',
      data: booking,
      hasBackdrop: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
