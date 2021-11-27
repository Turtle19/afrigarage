import { Garage } from "./garageEntity";
import { Service } from "./serviceEntity";
import { User } from "./userEntity";

export interface Booking{
    id: number,
    status: Status,
    description: string;
    price: number;
    immatriculation: string,
    date: Date;
    garage: Garage,
    user: any,
    service: Service,
    usercomment: string;
}

export enum Status{
    CANCELED ="CANCELED", 
    VALIDATED = "VALIDATED", 
    DRAFT = "DRAFT"
}