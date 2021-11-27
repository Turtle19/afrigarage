import { Booking } from './booking';
import { OpeningHours } from './openinHours';
import { Service } from './serviceEntity';
import { User } from './userEntity';

export interface Garage {
  id: number;
  name: string;
  description: string;
  email: string;
  phone_number: string;
  address: string;
  latitude: number;
  longitude: number;
  logo: Logo;
  bookings: Booking[];
  ratings: [];
  comments: Comment[];
  opening_hours: OpeningHours[];
  payments: [];
  payment_types: PaymentType[];
  services: Service[];
  isFavoris: boolean;
}

export interface Comment {
  id: number;
  description: string;
  user: User;
  nbrLikes: number;
  garage: number;
}

export interface Favoris {
  id: number;
  garage: Garage;
  user: User;
}

export interface PaymentType{
  id: number;
  type: string;
  payment: any;
  icon: Logo
}

export interface Logo {
  id: number;
  name: string;
  url: string;
}
