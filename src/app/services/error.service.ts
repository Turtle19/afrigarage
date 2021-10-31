import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      console.log("An error occured: ", error.error.message);
    } else{
      console.log(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      
    }
    return throwError(error);
  }
}
