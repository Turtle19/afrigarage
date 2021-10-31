import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  get isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    console.log(localStorage.getItem('id_token'));
    
  }
  title = 'afrigarage';
  isConnected = false;
  
  navbarOpen = false; 

  toggleNavbar() { 
    this.navbarOpen = !this.navbarOpen; 
  } 
}
