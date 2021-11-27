import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { catchError, map } from 'rxjs/operators';
import { AuthResponse, User } from '../entities/userEntity';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })
  }

  connect(login: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<any>(`${environment.urlAuth}`, { identifier: login, password })
      .pipe(
        map((response: AuthResponse) => {
          localStorage.setItem('id_token', response.jwt);
          localStorage.setItem('id_user', response.user.id.toString());
          return response;
        }),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  register(newUser: any): Observable<User> {
    return this.http
      .post<User>(`${environment.urlRegister}`, newUser, this.httpOptions)
      .pipe(
        map((response: User) => {
          return response;
        }),
        catchError((err) => this.errorService.handleError(err))
      );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('id_user')
  }

  public isLoggedIn() {
    return localStorage.getItem('id_token') !== null;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
