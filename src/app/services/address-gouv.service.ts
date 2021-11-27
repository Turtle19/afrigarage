import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AddressGouvService {

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getAddresses(keyword: string): Observable<any>{
    return this.http.get<any>(`https://api-adresse.data.gouv.fr/search/?q=${keyword}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }
}
