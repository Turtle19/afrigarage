import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Service } from '../entities/serviceEntity';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getServiceInfos(idService: number): Observable<Service>{
    return this.http.get<Service>(`${environment.urlBack}/service/${idService}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => this.errorService.handleError(err))
    );
  }
}
