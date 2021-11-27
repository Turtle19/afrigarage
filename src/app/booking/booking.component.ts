import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Booking, Status } from '../entities/booking';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: Booking[] = [];
  url = environment.urlBack;
  status = Status;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    let idUser = localStorage.getItem('id_user');
    if (idUser !== null) {
      this.bookingService.getUserBooking(parseInt(idUser, 10)).subscribe(bookings => this.bookings = bookings)
    }
  }

  cancelBooking(booking: Booking){
    let idUser = localStorage.getItem('id_user');
    booking.user = null;
    booking.status = Status.CANCELED;
    Swal.fire({
      title: 'Souhaitez-vous annuler le rendez-vous?',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.updateBooking(booking).subscribe(res => {
          if (res !== null && idUser !== null) {
            this.bookingService.getUserBooking(parseInt(idUser, 10)).subscribe(bookings => this.bookings = bookings);
            Swal.fire('Annulation effectuée avec succès!', '', 'success');
          }
        })
      } else {
        Swal.fire('Aucune modification n\'a été effectuée', '', 'info')
      }
    })
  }

  dateIsBefore(booking: Booking){
    const date = new Date(booking.date);
    return date.getTime() < new Date().getTime();
  }
}
