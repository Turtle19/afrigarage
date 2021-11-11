import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Garage } from '../entities/garageEntity';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private garages: Garage[] = [];

  private messageSource = new BehaviorSubject(this.garages);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(garages: Garage[]) {
    this.messageSource.next(garages)
  }
}
