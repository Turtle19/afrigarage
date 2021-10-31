import { Component, Input, OnInit } from '@angular/core';
import { Garage } from '../entities/garageEntity';

@Component({
  selector: 'app-garage-item',
  templateUrl: './garage-item.component.html',
  styleUrls: ['./garage-item.component.css']
})
export class GarageItemComponent implements OnInit {

  @Input() garage: Garage | undefined

  constructor() { }

  ngOnInit(): void {
  }

  addToFavorite(event: Event){
    event.stopPropagation();

    console.log('add to favorite');
    
  }

}
