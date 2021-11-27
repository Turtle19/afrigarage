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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { GarageItemComponent } from './garage-item/garage-item.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GarageDetailComponent } from './garage-detail/garage-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogRDVComponent } from './dialog-rdv/dialog-rdv.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BookingAddDialogComponent } from './booking-add-dialog/booking-add-dialog.component';
import { InscriptionComponent } from './inscription/inscription.component';

export const MATERIAL_MODULE = [
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatListModule,
  MatExpansionModule,
  MatTooltipModule,
  MatInputModule,
  MatAutocompleteModule
];

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
    DialogRDVComponent,
    BookingAddDialogComponent,
    InscriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    ...MATERIAL_MODULE,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
