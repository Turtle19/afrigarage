import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private httpOptions = {
    header: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

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
    return this.http.get<Booking[]>(`${environment.urlBack}/bookings?garage.id=${garageId}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }

  addBooking(booking: Booking): Observable<Booking>{
    return this.http.post<Booking>(`${environment.urlBack}/bookings`, booking).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }
  updateBooking(booking: Booking): Observable<Booking>{
    console.log(booking.id);
    
    return this.http.put<Booking>(`${environment.urlBack}/bookings/${booking.id}`, booking).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }
}
