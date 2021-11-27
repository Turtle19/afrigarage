import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      console.log("An error occured: ", error.error.message);
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Quelque chose s\'est mal passé!',
        footer: '<a href="">Veuillez réessayer svp !</a>'
      });
      console.log(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      
    }
    return throwError(error);
  }
}
