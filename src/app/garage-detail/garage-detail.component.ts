import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Garage } from '../entities/garageEntity';
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'app-garage-detail',
  templateUrl: './garage-detail.component.html',
  styleUrls: ['./garage-detail.component.css']
})
export class GarageDetailComponent implements OnInit {

  garage: Garage | undefined;

  constructor(private garageService: GarageService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const garageId = this.route.snapshot.paramMap.get('id');
    if (garageId !== null) {
      this.garageService.getGarageById(parseInt(garageId, 10)).subscribe(garage => {
        this.garage = garage;
        console.log(this.garage);
        
      })
    }
    
  }

}
