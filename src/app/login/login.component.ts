import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthResponse } from '../entities/userEntity';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userInfoForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.userInfoForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/accueil'])
    }
  }

  onSubmit() {
    this.loading = true;
    const val = this.userInfoForm.value;
    if (val.username && val.password) {
      this.authService
      .connect(
        val.username,
        val.password
      )
      .subscribe((authResp: AuthResponse) => {
        if (authResp) {
          this.router.navigate(['/accueil'])
        }
      });
    } else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'L\'identifiant et le mot de passe sont réquis !'
      });
    }
  }
}
