import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { FavorisComponent } from './favoris/favoris.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'accueil', component: HomeComponent },
{ path: 'reservation', component: BookingComponent },
{ path: 'favoris', component: FavorisComponent },
{ path: '',   redirectTo: '/accueil', pathMatch: 'full' }, // redirect to `homeComponent`
{ path: '**', component: PageNotFoundComponent } ] // Wildcard route for a 404 page;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
