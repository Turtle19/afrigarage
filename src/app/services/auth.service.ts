import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { catchError, map } from 'rxjs/operators';
import { AuthResponse } from '../entities/userEntity';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  connect(login: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<any>(`${environment.urlAuth}`, { identifier: login, password })
      .pipe(
        map((response) => {
          localStorage.setItem('id_token', response.jwt);
          return response;
        }),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  public isLoggedIn() {
    return localStorage.getItem('id_token') !== null;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
