import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Garage } from '../entities/garageEntity';
import { AuthService } from '../services/auth.service';
import { GarageService } from '../services/garage.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  searchForm: FormGroup;
  garagesResult: Garage[] = [];
  subscription: Subscription | undefined;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private garageService: GarageService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      keyword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.garageService
      .getGaragesBySearch(this.searchForm.value.keyword)
      .subscribe((garages) => {
        this.garagesResult = garages;
        this.sharedService.changeMessage(garages)
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
