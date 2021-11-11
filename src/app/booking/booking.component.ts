import { Component, OnInit } from '@angular/core';
import { Booking } from '../entities/booking';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    let idUser = localStorage.getItem('id_user');
    if (idUser !== null) {
      this.bookingService.getServiceInfos(parseInt(idUser, 10)).subscribe(bookings => this.bookings = bookings)
    }
    
  }

}
