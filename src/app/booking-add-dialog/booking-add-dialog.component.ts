import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Booking, Status } from '../entities/booking';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking-add-dialog',
  templateUrl: './booking-add-dialog.component.html',
  styleUrls: ['./booking-add-dialog.component.css'],
})
export class BookingAddDialogComponent implements OnInit {
  bookingForm: FormGroup = this.fb.group({
    description: [this.data.description, Validators.required],
    immatriculation: ['', Validators.required],
    price: [this.data.price, Validators.required],
    date: [this.data.date, Validators.required],
    service: [this.data.service.name, Validators.required],
    usercomment: [''],
    garage: [this.data.garage.id],
  });

  booking: Booking;

  constructor(
    public dialogRef: MatDialogRef<BookingAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Booking,
    private bookingService: BookingService,
    private fb: FormBuilder
  ) {
    this.booking = data;
  }

  ngOnInit(): void {}

  cancelBooking() {
    this.dialogRef.close();
    Swal.fire('Aucune réservation n\'a été effectuée', '', 'info')
  }

  formatDate() {
    const date = new Date(this.data.date);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    let h = hour < 9 ? '0' + hour : hour;
    let min = minutes < 9 ? '0' + minutes : minutes;
    return h + ':' + min;
  }

  onSubmit() {
    const userId = localStorage.getItem('id_user');
    if (this.bookingForm.valid && userId !== null) {
      this.initBooking();
      this.booking.user = parseInt(userId, 10);
      Swal.fire({
        title: 'Souhaitez-vous confirmer la réservation?',
        showCancelButton: true,
        confirmButtonText: 'Confirmer',
      }).then((result) => {
        if (result.isConfirmed) {
          this.bookingService.addBooking(this.booking).subscribe(res => {
            if (res !== null) {
              Swal.fire('Réservation créé avec succès!', '', 'success');
              this.dialogRef.close();
            }
          })
        } else {
          Swal.fire('Aucune réservation n\'a été effectuée', '', 'info')
        }
      })
    }
  }

  initBooking() {
    this.booking.immatriculation = this.bookingForm.value.immatriculation;
    this.booking.date = this.data.date;
    this.booking.service = this.data.service;
    this.booking.description = this.data.description;
    this.booking.price = this.data.price;
    this.booking.garage = this.data.garage;
    this.booking.usercomment = this.bookingForm.value.usercomment;
    this.booking.status = Status.VALIDATED;
  }
}
