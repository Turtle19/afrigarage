import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Garage } from '../entities/garageEntity';
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false; 
  searchForm: FormGroup;
  garagesResult: Garage[] = [];

  toggleNavbar() { 
    this.navbarOpen = !this.navbarOpen; 
  } 

  constructor(private fb: FormBuilder, private garageService: GarageService) { 
    this.searchForm = this.fb.group({
      keyword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.searchForm.value);
    this.garageService.getGaragesBySearch(this.searchForm.value.keyword).subscribe(garages => {
      this.garagesResult = garages;
      console.log(this.garagesResult.length);
      
    })
    
  }

}
