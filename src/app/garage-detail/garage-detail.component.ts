import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Garage } from '../entities/garageEntity';
import { GarageService } from '../services/garage.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogRDVComponent } from '../dialog-rdv/dialog-rdv.component';
import { Service } from '../entities/serviceEntity';

@Component({
  selector: 'app-garage-detail',
  templateUrl: './garage-detail.component.html',
  styleUrls: ['./garage-detail.component.css']
})
export class GarageDetailComponent implements OnInit {

  garage: Garage | undefined;

  constructor(private garageService: GarageService, private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    const garageId = this.route.snapshot.paramMap.get('id');
    if (garageId !== null) {
      this.garageService.getGarageById(parseInt(garageId, 10)).subscribe(garage => {
        this.garage = garage;
      })
    }
  }

  openDialogRdv(service: Service){
    const dialogRef = this.dialog.open(DialogRDVComponent, {
      width: '550px',
      data: service,
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });

  }

}
