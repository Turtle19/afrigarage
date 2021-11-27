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
    user: User,
    service: Service,
    usercomment: string;
}

export enum Status{
    DRAFT = "Brouillon", 
    CANCELLED = "Annuler", 
    VALIDATE = "Valider"
}