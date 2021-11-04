import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FavorisComponent } from './favoris/favoris.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookingComponent } from './booking/booking.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { GarageItemComponent } from './garage-item/garage-item.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GarageDetailComponent } from './garage-detail/garage-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogRDVComponent } from './dialog-rdv/dialog-rdv.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

export const MATERIAL_MODULE = [MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatDialogModule, MatListModule, MatExpansionModule];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavorisComponent,
    LoginComponent,
    PageNotFoundComponent,
    BookingComponent,
    GarageItemComponent,
    HeaderComponent,
    GarageDetailComponent,
    DialogRDVComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    ...MATERIAL_MODULE
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
