import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Avis, Favoris, Garage } from '../entities/garageEntity';
import { ErrorService } from './error.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getAllGarages(): Observable<Garage[]>{
    return this.http.get<Garage[]>(`${environment.urlBack}/garages`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }
  
  getGarageById(idGarage: number): Observable<Garage>{
    return this.http.get<Garage>(`${environment.urlBack}/garages/${idGarage}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }

  getGarageVote(idGarage: number): Observable<Avis[]>{
    return this.http.get<Avis[]>(`${environment.urlBack}/avis?garage.id=${idGarage}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }

  getGaragesBySearch(keyword: string): Observable<Garage[]>{
    return this.http.get<Garage[]>(`${environment.urlBack}/garages?name_contains=${keyword}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }

  addGarageToFavorite(idGarage: number, idUser: number): Observable<Favoris>{
    return this.http.post<any>(`${environment.urlBack}/favorises`, {garage: idGarage, client: idUser}).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }

  getGarageFav(idGarage: number, idUser: number): Observable<Favoris[]>{
    return this.http.get<any>(`${environment.urlBack}/favorises?garage.id=${idGarage}&client.id=${idUser}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );

  }

  removeGarageFromFav(idGarageFav: number): Observable<Favoris>{
    return this.http.delete<any>(`${environment.urlBack}/favorises/${idGarageFav}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );

  }
}