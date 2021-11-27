import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Booking } from '../entities/booking';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getUserBooking(idUser: number): Observable<Booking[]>{
    return this.http.get<Booking[]>(`${environment.urlBack}/bookings?user.id=${idUser}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }
  getBookings(): Observable<Booking[]>{
    return this.http.get<Booking[]>(`${environment.urlBack}/bookings`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }

  getGarageBookings(garageId: number){
    console.log(garageId);
    
    return this.http.get<Booking[]>(`${environment.urlBack}/bookings?garage.id=${garageId}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }
}
