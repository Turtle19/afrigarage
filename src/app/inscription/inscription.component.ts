import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Address } from '../entities/address';
import { User } from '../entities/userEntity';
import { AddressGouvService } from '../services/address-gouv.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent implements OnInit {
  userProfilForm: FormGroup = this.fb.group({
    firstname: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z  -]*')],
    ],
    lastname: [
      '',
      [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z  -]*')],
    ],
    password: ['', [Validators.required, Validators.maxLength(8)]],
    phoneNumber: ['', [Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    address: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', Validators.required],
  });

  listAddress: Address[] = [];
  filteredOptions: Observable<Address[]> | undefined;
  defaultCity = 'Lille';

  constructor(
    private fb: FormBuilder,
    private addressGouvService: AddressGouvService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addressGouvService.getAddresses(this.defaultCity).subscribe((res) => {
      this.listAddress = res.features;
    });

    this.filteredOptions = this.userProfilForm.controls.address.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  onSubmit() {
    if (this.userProfilForm.valid) {
      this.authService.register(this.initUser()).subscribe((userCreated) => {
        if (userCreated !== null) {
          this.router.navigate(['']);
          Swal.fire(
            'Inscription réussie. Vous pouvez dès maintenant vous connecter!',
            '',
            'success'
          );
        } else {
          Swal.fire('Une erreur est survenue veuillez réessayer', '', 'info');
        }
      });
    }
  }

  initUser() {
    return {
      username: this.userProfilForm.value.firstname + ' ' + this.userProfilForm.value.lastname,
      firstname: this.userProfilForm.value.firstname,
      lastname: this.userProfilForm.value.lastname,
      email: this.userProfilForm.value.email,
      phoneNumber: this.userProfilForm.value.phoneNumber,
      password: this.userProfilForm.value.password,
      address: this.userProfilForm.value.address,
      description: this.userProfilForm.value.description,
      customRole: "Client",
      urlPhoto: ""

    }
    // this.newUser.username =
    //   this.userProfilForm.value.firstname + ' ' + this.userProfilForm.value.lastname;
    // this.newUser.firstname = this.userProfilForm.value.firstname;
    // this.newUser.lastname = this.userProfilForm.value.lastname;
    // this.newUser.email = this.userProfilForm.value.email;
    // this.newUser.phoneNumber = this.userProfilForm.value.phoneNumber;
    // this.newUser.password = this.userProfilForm.value.password;
    // this.newUser.customRole = 'Client';
    // this.newUser.description = this.userProfilForm.value.description;
    // this.newUser.address = this.userProfilForm.value.address;
    // this.newUser.urlPhoto = '';
  }

  private _filter(value: string): Address[] {
    const filterValue = value.toLowerCase();
    let keyword = filterValue === '' ? this.defaultCity : filterValue;
    this.addressGouvService.getAddresses(keyword).subscribe((res) => {
      this.listAddress = res.features;
    });
    return this.listAddress?.filter((adr) =>
      adr.properties.label.toLowerCase().includes(filterValue)
    );
  }
}
